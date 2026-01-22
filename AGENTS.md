# AGENT TOOLKIT – Material CMS

## Rationale

This document provides LLM agents with a minimal, actionable toolkit for developing, debugging, and inspecting the ApostropheCMS‑based Material CMS project. Each section is designed to be used directly in command‑line interactions, avoiding unnecessary abstraction and focusing on pipe‑able, script‑friendly outputs.

---

## PROJECT OVERVIEW

- **Framework**: ApostropheCMS v2.227.11
- **Database**: MongoDB v6.0.27
- **Node**: v20.19.6 | **NPM**: v10.8.2

**Rule Zero**: Before creating any new helper, middleware, or utility function, **check the Apostrophe CMS v2 docs first**.
Search in `docs/apostrophe-v2-docs/reference/modules`for the relevant module reference.  
Sensitive configuration belongs in `data/local.js` (not committed).

---

## LEAN FRONTEND – MINIMAL INSTRUCTIONS

**Goal**: Eliminate jQuery from the public frontend while keeping the admin UI fully functional.

1. **Core configuration**  
   Set `lean: true` in `apostrophe-assets` (`app.js`).  
   jQuery loads **only** for logged‑in users (admin UI).  
   Public frontend uses `apos.utils` (~10 KB) instead of jQuery.

2. **Asset loading**
   - `when: 'lean'` → public assets (anonymous users)
   - `when: 'user'` → admin‑only assets (logged‑in users)
   - **Never** use `when: 'always'` (deprecated bloat).

3. **Widget players**

   ```javascript
   // lib/modules/[module]/public/js/widget.js
   apos.utils.widgetPlayers["widget-name"] = function (el, data, options) {
     // Enhance THIS widget only (el is DOM element)
     // Use apos.utils.* not jQuery
   };
   ```

   Auto‑executed on DOM ready & after AJAX.  
   `widget.js` = public enhancement (lean) | `user.js` = admin interface.

4. **AJAX utilities**  
   `ajax‑utils.js` extends `lean.js` with jQuery‑free navigation.  
   Use `apos.utils.ajaxGo()` and `apos.utils.ajaxAppend()`; locale is automatically preserved via cookie.

5. **Vanilla JS patterns**
   - `document.querySelector()` not `$()`
   - `el.addEventListener()` not `$.on()`
   - `apos.utils.get()`/`post()` not `$.ajax()`
   - `apos.utils.closest()`/`addClass()`/`removeClass()`

6. **Anti‑bloat rules**
   1. No new `when: 'always'` assets.
   2. No jQuery in `widget.js` (public frontend).
   3. No trivial wrapper functions – use framework primitives.
   4. Create utilities only for complex, reused logic.

7. **Migration checklist**
   - [ ] Replace `$()` with vanilla DOM methods
   - [ ] Convert `$.ajax()` to `apos.utils.get()`/`post()`
   - [ ] Update `when: 'always'` to `'lean'` or `'user'`
   - [ ] Test anonymous users (no jQuery)
   - [ ] Verify admin UI still works (jQuery available)

8. **Key files**
   - `lib/modules/apostrophe-assets/public/js/ajax-utils.js` – Lean AJAX extension
   - `node_modules/apostrophe/…/lean.js` – Base utilities
   - Widget modules: `widget.js` (public) + `leanUser.js` (admin)

**Direction**: Pure JavaScript system, no jQuery dependency for public frontend.

---

## SERVER MANAGEMENT

**Rationale**: Quick commands to control the ApostropheCMS development server.

- Start the dev environment (app + chromium): `npm run dev`
- Hot reload without restarting: `npm run reload`
- Restart the server: `npm restart`
- Stop the server: `npm stop`
- Check running apps: `pm2 list`
- Check logs: `tail -n 50 data/temp/dev.log`

The server runs on http://localhost:3000

---

## HTML INSPECTION

**Rationale**: Programmatically fetch and examine rendered HTML, including authenticated pages.

The `http` command is installed globally; use it right away.

```bash
# Basic GET with headers only
http HEAD http://localhost:3000

# Detailed headers (no body)
http --headers http://localhost:3000/

# Check for specific HTML element
http --print=h http://localhost:3000/ | grep -i "content-type"

# Custom User‑Agent
http http://localhost:3000/ User-Agent:"MyDebugAgent/1.0"
```

### Authentication workflow

```bash
# Login and capture session
http --ignore-stdin --form POST http://localhost:3000/login username=admin password=admin --session=./session.json

# Verify authentication
http --session=./session.json GET http://localhost:3000/

# Logout
http --session=./session.json GET http://localhost:3000/logout
```

**Troubleshooting**

- **CSRF warnings**: Ignore for simple GET requests; for POST, include CSRF token from page.
- **Invalid session**: Re‑login and update the session file.
- **No admin UI**: Verify the response includes `apos.user` in a script tag.

**Example**: Fetch a page as admin

```bash
http --ignore-stdin --form POST http://localhost:3000/login username=admin password=admin --session=./session.json
http --session=./session.json GET http://localhost:3000/ > admin_home.html
```

---

## DEBUGGING

**Rationale**: Locate issues across the stack and cleverly chain commands to your advantage.

**Example Worfklows**:

- Check if app is running: `pm2 list` and inspect rendered HTML: `http` or `curl`
- Add `apos.log` somewhere in the templates and check the logs with `tail -n 50 data/temp/dev.log`
- Use Javascript `console.log()` function and get the chromium console logs with `cdp-cli console`
- Check the database with: `mongosh material-cms`

**Pre installed tools**: All cli tools: `npm`, `pm2`,`http`, `jq`, `cdp-cli` are installed globally and already in your PATH. They will be available whenever you need them.

---

## BROWSER AUTOMATION WITH CDP‑CLI

**Rationale**: Automate front‑end inspection, interaction, and debugging via Chrome DevTools Protocol. Output is NDJSON (newline‑delimited JSON), ideal for parsing with `jq`.

**Since `npm run dev` starts a chromium instance this feature is always available**

### Quick start

```bash
# Extract page titles
# Chromium launches always with a localhost:3000 new tab
cdp-cli tabs | jq -r '.title'

# Inspect page content
cdp-cli snapshot "TEST PAGE" --format dom
```

### Command reference

| Category   | Command example                                    | Purpose                   |
| ---------- | -------------------------------------------------- | ------------------------- |
| Navigation | `cdp-cli tabs`                                     | List open pages           |
|            | `cdp-cli new <url>`                                | Create new tab            |
|            | `cdp-cli go <page> <url\|back\|forward\|reload>`   | Navigate                  |
| Inspection | `cdp-cli snapshot <page> [--format ax\|text\|dom]` | Get page structure        |
|            | `cdp-cli console <page> [--verbose\|--all]`        | Retrieve console messages |
|            | `cdp-cli eval <page> "<expression>"`               | Execute JavaScript        |
| Automation | `cdp-cli click <page> <selector>`                  | Click element             |
|            | `cdp-cli fill <page> <text> <selector>`            | Fill input field          |
|            | `cdp-cli key <page> <key>`                         | Press keyboard key        |
| Capture    | `cdp-cli screenshot <page> <output>`               | Take screenshot           |
| Network    | `cdp-cli network <page> [--duration 5]`            | Monitor network requests  |

**Example parsing with `jq`**

```bash
# Filter console errors
cdp-cli console "TEST PAGE" --verbose | jq -c 'select(.type == "error")'

# Count DOM elements
cdp-cli eval "TEST PAGE" "document.querySelectorAll('*').length" | jq -r '.value'
```

### Troubleshooting

- **Page not found**: Use `cdp-cli tabs` to see current page titles.
- **No console output**: Ensure `--duration` is set and page has logged messages.

**Detailed Reference**: Read `docs/cdp-cli.md` for detailed examples and command patterns for `cdp-cli` in a case of heavy debugging.

---

## RECURSIVE LANGUAGE MODEL (RLM) INFRASTRUCTURE

**Rationale**: Process arbitrarily long contexts (codebases, documentation, logs) through recursive decomposition, enabling sophisticated analysis beyond token limits.

### Quick Start

1. **Load a context** – any text (file content, log output, documentation):
   ```javascript
   // Via MCP tool
   mcp_rlm_rlm_load_context({
     context: "Your long text here...",
     context_id: "my_context"
   })
   ```

2. **Get metadata** – understand size and structure:
   ```javascript
   mcp_rlm_rlm_get_context_info({ context_id: "my_context" })
   ```

3. **Decompose** – split into manageable chunks:
   ```javascript
   mcp_rlm_rlm_decompose_context({
     context_id: "my_context",
     strategy: "by_sections"  // or "fixed_size", "by_lines", "by_paragraphs"
   })
   ```

4. **Read specific chunks** – retrieve content by index:
   ```javascript
   mcp_rlm_rlm_get_chunks({
     context_id: "my_context",
     chunk_indices: [0, 1, 2]
   })
   ```

5. **Search** – find patterns with regex:
   ```javascript
   mcp_rlm_rlm_search_context({
     context_id: "my_context",
     pattern: "error|warning",
     flags: "gi"
   })
   ```

### Use Cases

- **Codebase analysis**: Load entire module directories, decompose by file, search for patterns (e.g., `\$\(` for jQuery usage).
- **Documentation mining**: Parse `docs/` folder, extract architectural decisions.
- **Log inspection**: Load server logs, search for errors, decompose by time windows.
- **Long‑form planning**: Store migration plans, action items, and reference them chunk‑wise.

### Example Workflow: Audit jQuery Usage

```javascript
// 1. Load all public JavaScript files as a single context
// 2. Decompose by lines or fixed‑size chunks
// 3. Search for pattern `\$\(` or `jQuery`
// 4. Retrieve matching chunks with line numbers
// 5. Produce a report of files and lines to fix
```

### Key Tools

| Tool | Purpose |
|------|---------|
| `rlm_load_context` | Load text content into the RLM session |
| `rlm_get_context_info` | Get metadata (length, line count, structure) |
| `rlm_decompose_context` | Split context into chunks using various strategies |
| `rlm_get_chunks` | Retrieve content of specific chunks |
| `rlm_search_context` | Search context using regex patterns |
| `rlm_find_all` | Find all occurrences of a substring |
| `rlm_execute_code` | Execute JavaScript for custom data manipulation |

### Integration with Existing Toolkit

- **Combine with `cdp‑cli`**: Load browser console logs as context, search for errors.
- **Combine with `http`**: Fetch HTML pages, load as context, extract patterns.
- **Combine with `grep`/`jq`**: Pipe command outputs into RLM for deeper analysis.

### Performance Notes

- **Chunk size**: Default 10,000 characters with 200‑character overlap.
- **Strategies**: Choose based on content type:
  - `by_sections` for markdown with headers
  - `by_lines` for logs
  - `fixed_size` for uniform text
  - `by_paragraphs` for prose
- **Cache**: LRU caching of chunks for repeated access.

### Troubleshooting

- **Context not found**: Verify `context_id` matches loaded context.
- **No matches in search**: Check regex flags (`gi` for global case‑insensitive).
- **Large contexts**: Use `strategy: "fixed_size"` with `chunk_size: 50000` for very long texts.

---

## BASH SCRIPT RULES

**Rationale**: Keep automation scripts maintainable and predictable.

- Keep scripts under 300 lines.
- Use raw pipe‑able output (no colors/emojis).
- Fail early with clear error messages.
- Include comprehensive `--help` documentation.

---

## SEARCH THE DOCS TO CONNECT THE MISSING DOTS

- `docs/apostrophe-v2-docs` – A complete reference for ApostropheCMS v2 development.
- `node_modules/apostrophe/lib` - For references of the installed apostrophe v2.227.11 package.
- `docs/material-cms-docs`- References to custom Material CMS modules like `i18n`, `apostrophe-markdown` and `ajax-utils.js`.

---

## CURRENT DEVELOPMENT PARADIGM

- **NO TIMELINE EXPECTATIONS!**
- **NO DEADLINE – WE HAVE UNLIMITED TIME!**
- **RUN HTML INSPECTION AFTER CHANGES!**
- **USE ApostropheCMS v2 FUNCTIONS, NOT WRAPPERS!**
