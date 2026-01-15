# AGENT TOOLKIT – Material CMS

## Rationale
This document provides LLM agents with a minimal, actionable toolkit for developing, debugging, and inspecting the ApostropheCMS‑based Material CMS project. Each section is designed to be used directly in command‑line interactions, avoiding unnecessary abstraction and focusing on pipe‑able, script‑friendly outputs.

---

## PROJECT OVERVIEW
- **Framework**: ApostropheCMS v2.227.11
- **Database**: MongoDB v6.0.27
- **Node**: v20.19.6 | **NPM**: v10.8.2

**Rule Zero**: Before creating any new helper, middleware, or utility function, **check the Apostrophe CMS v2 docs first**.  
Search in [`docs/apostrophe-v2-docs/reference/modules`](docs/apostrophe-v2-docs/reference/modules) for the relevant module reference.  
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
   apos.utils.widgetPlayers['widget-name'] = function(el, data, options) {
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
**Reference**: [`docs/material-cms-docs/lean_frontend_assets.md`](docs/material-cms-docs/lean_frontend_assets.md) for full technical details.

---

## SERVER MANAGEMENT
**Rationale**: Quick commands to control the ApostropheCMS development server.

- Start the server with logs: `npm run dev`
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
- Use Javascript `console.log()` function and get the chromium console logs with `cdp‑cli`
- Check the database with: `mongosh material-cms`

**Pre installed tools**:
The cli tools: `npm`, `pm2`,`http`, `jq` and `cdp-cli` are installed globally and already in your PATH. They will be available whenever you need them.

---

## BROWSER AUTOMATION WITH CDP‑CLI
**Rationale**: Automate front‑end inspection, interaction, and debugging via Chrome DevTools Protocol. Output is NDJSON (newline‑delimited JSON), ideal for parsing with `jq`.

### Prerequisites
- ApostropheCMS app running (`npm run dev`)
- Chromium with remote debugging (`npm run chromium`)
- `cdp‑cli` installed globally (`npm install -g @myerscarpenter/cdp-cli`)

### Quick start
```bash
# List open pages
cdp-cli tabs

# Navigate to localhost:3000
cdp-cli new "http://localhost:3000"

# Inspect page content
cdp-cli snapshot "TEST PAGE" --format text
```

### Command reference
| Category       | Command example                              | Purpose                          |
|----------------|----------------------------------------------|----------------------------------|
| Page management| `cdp-cli tabs`                               | List open pages                 |
|                | `cdp-cli new <url>`                          | Create new tab                  |
|                | `cdp-cli go <page> <url\|back\|forward\|reload>` | Navigate                     |
| Inspection     | `cdp-cli snapshot <page> [--format ax\|text\|dom]` | Get page structure          |
|                | `cdp-cli console <page> [--verbose]`         | Retrieve console messages       |
|                | `cdp-cli eval <page> "<expression>"`         | Execute JavaScript              |
| Automation     | `cdp-cli click <page> <selector>`            | Click element                   |
|                | `cdp-cli fill <page> <text> <selector>`      | Fill input field                |
|                | `cdp-cli key <page> <key>`                   | Press keyboard key              |
| Capture        | `cdp-cli screenshot <page> <output>`         | Take screenshot                 |
| Network        | `cdp-cli network <page> [--duration 5]`      | Monitor network requests        |

### Ready‑to‑use bash utilities
Scripts in `scripts/` wrap common cdp‑cli tasks (all output is pipe‑able, no colors/emojis).

- `scripts/cdp-tabs.sh` – list pages (human‑readable table or NDJSON)  
- `scripts/cdp-snapshot-text.sh` – get text snapshot of a page  
- `scripts/cdp-console-errors.sh` – capture console errors with optional duration  
- `scripts/cdp-eval.sh` – evaluate JavaScript expression  
- `scripts/cdp-screenshot.sh` – take screenshot with format/quality options  

**Example parsing with `jq`**  
```bash
# Extract page titles
cdp-cli tabs | jq -r '.title'

# Filter console errors
cdp-cli console "TEST PAGE" --verbose | jq -c 'select(.type == "error")'

# Count DOM elements
cdp-cli eval "TEST PAGE" "document.querySelectorAll('*').length" | jq -r '.value'
```

### Troubleshooting
- **Page not found**: Use `cdp-cli tabs` to see current page titles.  
- **No console output**: Ensure `--duration` is set and page has logged messages.  
- **CDP connection refused**: Verify Chromium is running with `--remote-debugging-port=9222`.

**Full evaluation report**: See [`docs/cdp-cli.md`](docs/cdp-cli.md) for detailed examples and integration patterns.

----

## BASH SCRIPT RULES
**Rationale**: Keep automation scripts maintainable and predictable.

- Keep scripts under 300 lines.
- Use raw pipe‑able output (no colors/emojis).
- Fail early with clear error messages.
- Include comprehensive `--help` documentation.

---

## SEARCH THE DOCS
- [Apostrophe CMS v2 Documentation](docs/apostrophe-v2-docs) – complete reference for ApostropheCMS v2 development.  
- Search in `node_modules/apostrophe/lib` for references of the installed apostrophe v2.227.11 package.

---

## CURRENT DEVELOPMENT PARADIGM
- **NO TIMELINE EXPECTATIONS!**  
- **NO DEADLINE – WE HAVE UNLIMITED TIME!**  
- **RUN HTML INSPECTION AFTER CHANGES!**  
- **USE ApostropheCMS v2 FUNCTIONS, NOT WRAPPERS!**