# PROJECT GUIDELINES

## PROJECT OVERVIEW

- FRAMEWORK: ApostropheCMS v2.227.11
- DATABASE: MongoDB v6.0.27
- NODE: node v20.19.6
- NPM: v10.8.2

## PROJECT RULES

**CRITICAL THIS IS AN **ApostropheCMS v2** PROJECT**

1. BEFORE CREATING ANY NEW HELPER, MIDDLEWARE, OR UTILITY FUNCTION **CHECK APOSTROPHE CMS V2 DOCS FIRST**:

- Search in [Apostrophe CMS v2 Module Reference](docs/apostrophe-v2-docs/reference/modules) for the relevant information to implement new features according to apostrophe cms v2 modules. 
- Run a quick `tree -d docs/apostrophe-v2-docs/reference/modules` command, to see the available modules
- ApostropeCMS v2 uses `nunjucks` templating engine NOT `vue.js`! 
- `@apostropheXYZ` is a new pattern NOT SUPPORTED in v2!


## LEAN FRONTEND: MINIMAL INSTRUCTIONS

1. CORE CONFIGURATION

- Set `lean: true` in `apostrophe-assets` (app.js)
- jQuery only loads for logged-in users (admin UI)
- Public frontend uses `apos.utils` (~10KB) instead of jQuery

2. ASSET LOADING

- `when: 'lean'` = public assets (anonymous users)
- `when: 'user'` = admin-only assets (logged-in users)
- **Never use `when: 'always'`** - it's deprecated bloat

3. WIDGET PLAYERS

```javascript
// lib/modules/[module]/public/js/widget.js
apos.utils.widgetPlayers['widget-name'] = function(el, data, options) {
  // Enhance THIS widget only (el is DOM element)
  // Use apos.utils.* not jQuery
};
```
- Auto-executed on DOM ready & after AJAX
- Widget.js = public enhancement (lean)
- User.js = admin interface (user)

4. AJAX UTILITIES

- `ajax-utils.js` extends `lean.js` with jQuery-free navigation
- Use `apos.utils.ajaxGo()` and `apos.utils.ajaxAppend()`
- Automatically preserves locale via cookie

5. VANILLA JS PATTERNS

- `document.querySelector()` not `$()`
- `el.addEventListener()` not `$.on()`
- `apos.utils.get()`/`post()` not `$.ajax()`
- `apos.utils.closest()`/`addClass()`/`removeClass()`

6. **ANTI-BLOAT RULES**

  1. **No new `when: 'always'` assets**
  2. **No jQuery in widget.js** (public frontend)
  3. **No trivial wrapper functions** - use framework primitives
  4. **Create utilities only for complex, reused logic**

7. MIGRATION CHECKLIST

- [ ] Replace `$()` with vanilla DOM methods
- [ ] Convert `$.ajax()` to `apos.utils.get()`/`post()`
- [ ] Update `when: 'always'` to `'lean'` or `'user'`
- [ ] Test anonymous users (no jQuery)
- [ ] Verify admin UI still works (jQuery available)

8. KEY FILES

- `lib/modules/apostrophe-assets/public/js/ajax-utils.js` - Lean AJAX extension
- `node_modules/apostrophe/.../lean.js` - Base utilities
- Widget modules: `widget.js` (public) + `leanUser.js` (admin)

**DIRECTION**: Pure JavaScript system, no jQuery dependency for public frontend.
**REFERENCES**: Read @docs/material-cms-docs/lean_frontend_assets.md for a full technical reference.


## SERVER MANAGEMENT

1. Start the server with logs use: `npm run dev:start`

2. More Commands: 
  - Hot reload without restarting: `npm run reload`
  - Restart the server: `npm restart`
  - Stop the server: `npm stop`
  - Logs at @data/temp/dev.log


## HTML INSPECTION: MINIMAL INSTRUCTIONS

Use `http` preferably since it outputs better structured content or use `curl` but limit the output.

**THE `http` COMMAND IS INSTALLED GLOBALLY YOU CAN USE IT RIGHT AWAY**

Here are useful `http` command snippets for debugging rendered HTML pages, tailored for a coding agent context:

```shell
# 1. Basic GET request with headers only
http HEAD http://localhost:3000

# 2. GET with detailed headers (no body)
http --headers http://localhost:3000/

# 3. Check if page returns specific HTML element
http --print=h http://localhost:3000/ | grep -i "content-type"

# 4. GET with custom User-Agent
http http://localhost:3000/ User-Agent:"MyDebugAgent/1.0"
```

You can login as admin with the following command:

```shell
# 5. Returns "Found. Redirecting to /" when successful:
http --form POST http://localhost:3000/login username=admin password=admin

This can be done with `curl` as well but is more complex.
```

## DEBUGGING: MINIMAL INSTRUCTIONS

- Ceck if app is running with: `pm2 list`
- Check Logs with: `tail -n 50 data/temp/dev.log`
- Check the rendered HTML with `http` or `curl`
- Use Apostrophe CMS v2 logging mechanism `{{ apos.log(piece.content.items[0].type) }}` to cleverly add more logging
- Check the database with `mongosh material-cms`

# BASH SCRIPT RULES

- Keep scripts under 300 lines
- Use raw pipeable output (no colors/emojis)
- Fail early with clear error messages
- Include comprehensive `--help` documentation

**SEARCH THE DOCS FOR REFERENCES**

The [Apostrophe CMS v2 Documentation](docs/apostrophe-v2-docs) provides a complete reference for ApostropheCMS v2 development, from beginner tutorials to advanced API documentation. Use `tree docs/ -d` to get a quick overview of the existing documentation material.

## CURRENT DEVELOPMENT PARADIGM

- NO TIMELINE EXPECTATIONS!
- RUN HTML INSPECTION AFTER CHANGES!
- USE **ApostropheCMS v2** functions, NOT WRAPPERS!

----

## CURRENT DEVELOPMENT PARADIGM

- NO TIMELINE EXPECTATIONS!
- NO DEADLINE WE HAVE UNLIMITED TIME!
- RUN HTML INSPECTION AFTER CHANGES!
- USE **ApostropheCMS v2** functions, NOT WRAPPERS!

**CRITICAL**
- Every change on the i18n/multilingual implementation must be verified by `npm run test:i18n`
