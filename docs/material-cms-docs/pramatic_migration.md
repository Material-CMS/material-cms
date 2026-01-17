# Pragmatic Migration: Fork, Replace, Incrementally Improve

## Guiding Principles

1. **No massive breaking changes** – each step must keep the site fully functional.
2. **Fork useful Apostrophe core modules** – copy and trim rather than rewrite from scratch.
3. **Replace jQuery with vanilla JS** – continue the “lean frontend” initiative to its conclusion.
4. **Adopt lighter alternatives** where they provide clear benefits without disproportionate effort.

## Phase 0: Inventory and Prioritization

### 1. Apostrophe Core Modules Worth Forking

| Module | Purpose | Why Fork? | Estimated Effort |
|--------|---------|-----------|------------------|
| `apostrophe‑utils` | Logging, IDs, HTTP helpers, DOM utilities | Lightweight, already used everywhere; can be trimmed of jQuery dependencies. | Low |
| `apostrophe‑db` | MongoDB connection pooling, cursor helpers | Simple wrapper around native driver; easy to maintain. | Low |
| `apostrophe‑schemas` | Field type definitions, converters, validation | Complex but central to custom fields; fork and strip unused field types. | Medium |
| `apostrophe‑i18n` | Locale detection, cookie management | Already extended by `apostrophe‑i18n‑content`; fork and keep only needed logic. | Low |
| `apostrophe‑assets` | Asset loading, `pushAsset`, `when` conditions | Heavy; consider replacing with build‑time manifest, but fork as interim step. | High |

### 2. jQuery Usage Hotspots

| File | jQuery Usage | Replacement Strategy |
|------|--------------|----------------------|
| `widget‑editor.js` (DeepL) | `$()`, `$.on`, `$.ajax` | Already uses `apos.utils.post`; replace remaining `$` with `document.querySelector`. |
| Widget player scripts (`widget.js`) | Various `$` calls | Convert to vanilla JS using `apos.utils` where available. |
| Admin UI scripts (`user.js`) | jQuery required for Apostrophe admin | Keep jQuery for admin UI; focus on public frontend. |

### 3. Low‑Hanging Fruit (Quick Wins)

- **Replace `$()` in `ajax‑utils.js`** – already uses vanilla DOM methods; verify no jQuery.
- **Audit `when: 'always'` assets** – change to `'lean'` or `'user'`.
- **Remove jQuery from widget players** – one widget at a time.

## Phase 1: Fork and Trim `apostrophe‑utils`

### Steps
1. Copy `node_modules/apostrophe/lib/utils.js` and related utility files into `lib/core/utils/`.
2. Remove jQuery‑dependent functions (e.g., `$`‑based DOM helpers) or replace with vanilla equivalents.
3. Keep `log`, `generateId`, `get`, `post`, `emit`, `onReady`, `runPlayers`.
4. Update module references to use local copy:
   ```javascript
   // In each module
   var utils = require('../core/utils');
   // Instead of self.apos.utils
   ```
5. Create a shim that delegates `self.apos.utils` to the forked version.

### Benefit
- Decouples from Apostrophe version.
- Allows us to improve utilities without waiting for upstream updates.

## Phase 2: Eliminate jQuery from Public Frontend

### Steps
1. **Audit** all `public/js` files for `$` or `jQuery` usage.
2. **Replace** each occurrence with vanilla JS or `apos.utils` equivalent.
   - `$(selector)` → `document.querySelector` / `document.querySelectorAll`
   - `$.on` → `addEventListener`
   - `$.ajax` → `apos.utils.get`/`post`
   - `$.closest` → `apos.utils.closest`
3. **Test** each widget as anonymous user (no jQuery loaded).
4. **Remove jQuery from lean bundle** – ensure `apostrophe‑assets` config `lean: true` already excludes jQuery.

### Benefit
- Reduces public page weight by ~30 KB (jQuery removed).
- Aligns with modern JavaScript practices.

## Phase 3: Fork `apostrophe‑db` and `apostrophe‑schemas`

### Steps
1. Copy relevant files from Apostrophe’s `lib/modules/apostrophe‑db` and `apostrophe‑schemas`.
2. Trim schemas to only support field types we use (`string`, `boolean`, `select`, `color`, `multilingual‑string`, etc.).
3. Replace any internal use of `self.apos.utils` with our forked utils.
4. Update module definitions to extend our forked base classes.

### Benefit
- Full control over database queries and schema evolution.
- Ability to add custom optimizations (e.g., projection hints, caching).

## Phase 4: Replace Asset Pipeline with Build‑Time Manifest

### Steps
1. Set up Vite or Webpack to bundle all `public/js` and `public/css` assets.
2. Generate a manifest `public/dist/manifest.json` mapping asset names to hashed filenames.
3. Create helper `assetUrl(name)` used in templates.
4. Replace `self.pushAsset` calls with template logic that injects script/link tags based on manifest.
5. Keep `when: 'lean'`/`'user'` differentiation via server‑side conditionals.

### Benefit
- Modern bundling (tree‑shaking, minification, code splitting).
- Eliminates runtime asset compilation overhead.

## Phase 5: Gradual Module Extraction

### Approach
For each custom module (e.g., `card‑widgets`, `galleries`):
1. **Analyze dependencies** on Apostrophe base classes.
2. **Create a lightweight alternative** that implements only the methods we use.
3. **Run both implementations in parallel** using a feature flag.
4. **Switch over** after testing.

### Example: Card Widgets
- Extends `apostrophe‑images‑widgets`.
- Uses `piecesModuleName`, `addFields`, `arrangeFields`, `filters`.
- Alternative: create a generic `Widget` class that renders images with same template.

## Phase 6: Remove Apostrophe Dependency

### Final Steps
1. Once all modules are migrated, remove `apostrophe` from `package.json`.
2. Delete `node_modules/apostrophe` and any unused Apostrophe‑plugin packages.
3. Update `app.js` to bootstrap our own framework.
4. Run full regression suite.

## Risk Mitigation

- **Parallel runs** – keep old and new code side‑by‑side during transition.
- **Feature flags** – allow quick rollback.
- **Comprehensive testing** – use cdp‑cli for browser automation to detect visual regressions.
- **Performance monitoring** – track Lighthouse scores before/after each phase.

## Immediate Action Items (Next Sprint)

1. **Fork `apostrophe‑utils`** – create `lib/core/utils` with trimmed utilities.
2. **Audit and replace jQuery in one widget player** (e.g., `card‑widgets/public/js/widget.js`).
3. **Update `ajax‑utils.js`** to ensure zero jQuery dependency.
4. **Add CI step** that fails if any `public/js` file contains `$(` or `jQuery`.

## Conclusion

This pragmatic approach allows us to incrementally replace Apostrophe components with lighter, forked versions while keeping the site live and stable. Each step delivers immediate value (reduced bundle size, better control) and builds toward a fully independent codebase.

We are not deciding “whether” to migrate—we are executing a systematic, low‑risk migration that aligns with the project’s long‑term sustainability.