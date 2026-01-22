# Chrome DevTools CLI

Command-line interface for Chrome DevTools Protocol (CDP), optimized for LLM agents with NDJSON output format.

## Overview

`cdp-cli` provides CLI access to all Chrome DevTools Protocol features, making it easy to automate browser interactions, debug web applications, and inspect network traffic - all from the command line with grep/tail-friendly output.

## New Features

### `--inspect` for Console Output
Fully expand nested objects and arrays in console messages instead of seeing `Object` or `Array(12)`:

```bash
# Without --inspect
cdp-cli console "MyPage"
"Config: {options: Object, values: Array(5)}"

# With --inspect - see actual values
cdp-cli console "MyPage" --inspect
"Config: {options: {debug: true, level: 3}, values: [1, 2, 3, 4, 5]}"
```

### `--user-gesture` for Click Command
Enable WebXR, fullscreen, and other activation-gated browser APIs that require user interaction:

```bash
# Standard click (uses Input.dispatchMouseEvent)
cdp-cli click "MyPage" "button#submit"

# User gesture click (uses Runtime.evaluate with userGesture: true)
# Required for WebXR session requests, fullscreen API, etc.
cdp-cli click "MyPage" "button#enter-vr" --user-gesture
```

## Output Format: NDJSON

All list commands output **newline-delimited JSON (NDJSON)** - one complete JSON object per line. This format is:
- **LLM-friendly**: Easy to parse programmatically
- **Grep-compatible**: Filter with standard Unix tools
- **Streamable**: Handle large datasets incrementally

### Example NDJSON Output

```bash
$ cdp-cli tabs
{"id":"A1B2C3","title":"GitHub","url":"https://github.com","type":"page"}
{"id":"D4E5F6","title":"Google","url":"https://google.com","type":"page"}

$ cdp-cli console "example"
{"type":"log","timestamp":1698234567890,"text":"Page loaded","source":"console-api"}
{"type":"error","timestamp":1698234568123,"text":"TypeError: Cannot read...","source":"exception","line":42,"url":"https://example.com/app.js"}

$ cdp-cli network "example" | grep '"type":"fetch"'
{"url":"https://api.example.com/data","method":"GET","status":200,"type":"fetch","size":4567}
```

## Commands

### Page Management

**tabs** - List all open browser pages
```bash
cdp-cli tabs
```

**new** - Create a new page/tab
```bash
cdp-cli new "http://localhost:3000"
cdp-cli new  # Empty page
```

**go** - Navigate page (URL, back, forward, reload)
```bash
cdp-cli go "example" "http://localhost:3000"
cdp-cli go "example" back
cdp-cli go "example" forward
cdp-cli go "example" reload
```

**close** - Close a page
```bash
cdp-cli close "example"
cdp-cli close A1B2C3
```

### Debugging

**console** - List console messages (minimal output by default, optimized for LLM token savings)
```bash
# Minimal output (bare strings, last 10 messages)
cdp-cli console "example"
"Page loaded"
"API call successful"

# Show more messages
cdp-cli console "example" --tail 50

# Show all messages (no limit)
cdp-cli console "example" --all
# or
cdp-cli console "example" --tail -1

# Note: When truncated, stderr shows: "(N messages skipped. Use --tail M or --all to see more)"
# This warning is visible to both humans and LLM agents

# Include message type (switches to object format)
cdp-cli console "example" --with-type
{"text":"Page loaded","type":"log","source":"console-api"}
{"text":"Error: failed","type":"error","source":"exception","line":42,"url":"app.js"}

# Include timestamp
cdp-cli console "example" --with-timestamp
{"text":"Page loaded","timestamp":1698234567890}

# Include source location (url, line number for exceptions)
cdp-cli console "example" --with-source
{"text":"Error: undefined","url":"https://example.com/app.js","line":42}

# Verbose mode - all fields (shortcut for all three flags)
cdp-cli console "example" --verbose
# or
cdp-cli console "example" -v
{"text":"Error: undefined","type":"error","source":"exception","timestamp":1698234567890,"url":"app.js","line":42}

# Expand nested objects/arrays (instead of "Object" or "Array(N)")
cdp-cli console "example" --inspect
# or
cdp-cli console "example" -i

# Filter by type (still outputs bare strings by default)
cdp-cli console "example" --type error

# Collect for longer duration (2 seconds)
cdp-cli console "example" --duration 2
```

**snapshot** - Get page content snapshot
```bash
# Accessibility tree (default) - great for LLM element identification!
cdp-cli snapshot "example"

# Text content only
cdp-cli snapshot "example" --format text

# DOM tree (JSON)
cdp-cli snapshot "example" --format dom
```

**eval** - Evaluate JavaScript expression
```bash
cdp-cli eval "example" "document.title"
cdp-cli eval "example" "window.location.href"
cdp-cli eval "example" "Array.from(document.querySelectorAll('h1')).map(h => h.textContent)"
```

**screenshot** - Take a screenshot
```bash
# Save to file
cdp-cli screenshot "example" --output screenshot.jpg

# Different formats
cdp-cli screenshot "example" --output screenshot.png --format png

# Output base64 (NDJSON)
cdp-cli screenshot "example"
```

### Network Inspection

**network** - List network requests (collects for 0.1s by default)
```bash
# Collect requests (default 0.1 seconds)
cdp-cli network "example"

# Collect for longer duration (5 seconds)
cdp-cli network "example" --duration 5

# Filter by type
cdp-cli network "example" --type fetch
cdp-cli network "example" --type xhr

# Combine duration and filtering
cdp-cli network "example" --duration 5 --type fetch
```

### Input Automation

**click** - Click an element by CSS selector
```bash
cdp-cli click "example" "button#submit"
cdp-cli click "example" "a.link" --double

# Use --user-gesture for WebXR, fullscreen, and other activation-gated APIs
cdp-cli click "example" "button#enter-vr" --user-gesture
cdp-cli click "example" "button#fullscreen" -g  # short flag
```

**fill** - Fill an input element
```bash
cdp-cli fill "example" "user@example.com" "input#email"
cdp-cli fill "example" "secret123" "input[name='password']"
```

**key** - Press a keyboard key
```bash
cdp-cli key "example" enter
cdp-cli key "example" tab
cdp-cli key "example" escape
```

## LLM Usage Patterns

### Pattern 1: Inspect and Interact

```bash
# 1. List pages to find target
cdp-cli tabs | grep "example"

# 2. Get accessibility tree to understand page structure
cdp-cli snapshot "example" --format ax > page-structure.json

# 3. Parse structure (LLM can identify element selectors)
# 4. Interact with elements
cdp-cli fill "example" "query" "input#search"
cdp-cli click "example" "button[type='submit']"

# 5. Capture result
cdp-cli screenshot "example" --output result.jpg
```

### Pattern 2: Debug Web Application

```bash
# 1. Navigate to app
cdp-cli new "http://localhost:3000"

# 2. Monitor console for errors (increase duration for continuous monitoring)
cdp-cli console "localhost" --duration 10 --type error

# 3. Inspect failed network requests
cdp-cli network "localhost" --duration 5 | grep '"status":4'
```

### Pattern 3: Automated Testing

```bash
# 1. Open test page
cdp-cli new "http://localhost:8080/test.html"

# 2. Fill form
cdp-cli fill "test" "testuser" "input#username"
cdp-cli fill "test" "testpass" "input#password"
cdp-cli click "test" "button#login"

# 3. Wait and verify
sleep 2
cdp-cli eval "test" "document.querySelector('.success-message')?.textContent"

# 4. Capture evidence
cdp-cli screenshot "test" --output test-result.jpg
```

### Pattern 4: Data Extraction

```bash
# 1. Navigate to page
cdp-cli go "example" "https://example.com/data"

# 2. Extract data via JavaScript
cdp-cli eval "example" "Array.from(document.querySelectorAll('.item')).map(el => ({
  title: el.querySelector('.title').textContent,
  price: el.querySelector('.price').textContent
}))"
```

## Global Options

- `--cdp-url <url>` - Chrome DevTools Protocol URL (default: `http://localhost:9222`)
- `--help` - Show help
- `--version` - Show version

## Tips for LLM Agents

1. **Use NDJSON parsing**: Each line is a complete JSON object
   ```javascript
   const lines = output.split('\n').filter(l => l.trim());
   const objects = lines.map(l => JSON.parse(l));
   ```

2. **Leverage grep for filtering**:
   ```bash
   cdp-cli network "example" | grep '"status":404'
   cdp-cli console "example" | grep error
   ```

3. **Use accessibility tree for element discovery**:
   ```bash
   cdp-cli snapshot "example" --format ax
   # Parse to find elements by role, name, etc.
   # Then construct CSS selectors for click/fill
   ```

4. **Chain commands with Unix tools**:
   ```bash
   cdp-cli tabs | jq -r '.title'
   cdp-cli console "example" | grep error | tail -5
   ```

5. **Error handling**: All errors output NDJSON with `"error": true`
   ```json
   {"error":true,"message":"Page not found: example","code":"PAGE_NOT_FOUND"}
   ```