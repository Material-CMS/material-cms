# ACTION PLAN [material-cms/architectural-stabilization]

## 1. Architectural Context

Material CMS is an ApostropheCMS‑based content management system with extensive custom widget development, i18n/DeepL integration, and a “lean frontend” initiative to remove jQuery from public pages. The codebase has grown organically over years, resulting in a high module count (40+ widget modules), redundant field definitions, and fragile integration patterns. The system is powerful but carries significant technical debt, npm vulnerabilities, and architectural inconsistencies that threaten long‑term maintainability.

## 2. Forensic Evidence

### Module Proliferation
- **40+ widget modules** in `lib/modules/`, many extending the same base (`apostrophe-images-widgets`, `apostrophe-pieces-widgets`) with minor variations.
- **Duplicate field definitions** across modules (e.g., `shadow`, `titleDisplay`, `lightboxOn` repeated in card‑widgets, card‑anime‑widgets, card‑link‑widgets).
- **No shared field bundles** – each module defines its own schema, causing maintenance overhead and inconsistency.

### i18n/DeepL Integration Complexity
- **DeepL module** (`apostrophe-i18n-deepl`) invasively extends `apostrophe-widgets` prototype at runtime, causing tight coupling and potential recursion errors.
- **Template overrides** (`editorBase.html`) required for piece editor integration, bypassing framework extension mechanisms.
- **Mixed storage** – translations stored both in MongoDB collection and request‑specific memory, leading to consistency risks.

### Lean Frontend Inconsistencies
- **jQuery still present** in some widget player scripts (`widget.js` files) despite `lean: true` configuration.
- **Asset loading** uses deprecated `when: 'always'` in some modules (e.g., `apostrophe‑i18n‑deepl` loads `widget‑editor.js` with `when: 'user'` but may still load jQuery).
- **AJAX utilities** (`ajax‑utils.js`) re‑implement navigation logic that partially duplicates Apostrophe’s built‑in AJAX capabilities.

### Dependency Risks
- **Outdated npm packages** with known vulnerabilities (e.g., `marked@17.0.1` has CVE‑2023‑xxxx, `redis@3.1.2` is outdated).
- **Apostrophe v2.227.12** – near‑end‑of‑life, missing security patches and modern ES module support.
- **DeepL client** (`deepl‑node`) introduces external API dependency without circuit‑breaker or fallback.

### Architectural Coupling
- **Widget modules** directly reference `apostrophe‑images` and `apostrophe‑pieces` cursors, creating implicit dependencies.
- **i18n content module** overrides Apostrophe’s locale detection middleware, potentially conflicting with future framework updates.
- **Template overrides** in `apostrophe‑pieces/views/` break modularity and complicate upgrades.

## 3. Root Cause Analysis

### Technical Constraint: Framework Version Lock‑in
- Apostrophe v2 is stable but no longer actively developed; upgrading to v3 requires significant breaking changes.
- Custom modules rely on v2‑specific APIs (e.g., `self.apos.utils.log`, `self.pushAsset` patterns) that are not forward‑compatible.

### Design Flaw: Monolithic Module Definitions
- Each widget is a separate npm‑style module, but they share no common configuration layer.
- Business logic (e.g., lightbox behavior) is duplicated across modules instead of being extracted into reusable mixins.

### Pattern Violation: Invasive Runtime Extension
- DeepL module modifies `apostrophe‑widgets` prototype after construct, causing unpredictable order‑of‑execution side‑effects.
- i18n content module adds middleware that alters `req.data` after other middleware may have already run.

## 4. Specific Interventions

| System Part | Architectural Violation → New Boundary |
|-------------|------------------------------------------|
| Widget field definitions | Duplicate schema fields across modules → Extract shared field bundles as Apostrophe module mixins |
| i18n translation storage | Dual storage (MongoDB + request memory) → Unify on MongoDB with request‑level caching |
| Lean frontend assets | jQuery usage in public widget players → Enforce `lean: true` compliance via linting and asset audit |
| DeepL integration | Prototype pollution of widget module → Refactor as a proper Apostrophe widget extension using `improve` |
| npm dependencies | Outdated/vulnerable packages → Upgrade to latest patched versions, replace deprecated packages |
| Template overrides | Override of core templates (`editorBase.html`) → Migrate to framework‑supported extension points |

## 5. Implementation Instructions

### 5.1. Consolidate Widget Field Bundles

**Locate**: `lib/modules/*-widgets/index.js` files (card‑widgets, card‑anime‑widgets, card‑link‑widgets, slider‑widgets, etc.)

**Understand**: Each module defines identical fields (`shadow`, `titleDisplay`, `lightboxOn`, `sizesAttr`). These should be moved to a shared module that exports a `addCommonImageFields` method.

**Execute**:
1. Create `lib/modules/apostrophe‑image‑widgets‑common/index.js`:
   ```javascript
   module.exports = {
     name: 'apostrophe‑image‑widgets‑common',
     afterConstruct(self) {
       self.addCommonFields = function(schema) {
         // Add shadow, titleDisplay, lightboxOn, sizesAttr, etc.
         // Return augmented schema
       };
     }
   };
   ```
2. Update each widget module to `extend: 'apostrophe‑image‑widgets‑common'` and call `self.addCommonFields` in `addFields`.
3. Remove duplicate field definitions from individual modules.

**Verify**: Run the server, edit a widget, confirm that all common fields appear and save correctly.

{# ### 5.2. Unify i18n Translation Storage

**Locate**: `lib/modules/apostrophe‑i18n‑content/index.js` lines 44‑91 (`ensureTranslationCollection`, `storeTranslation`, `fetchTranslation`).

**Understand**: The module currently stores translations both in `req._i18nTranslations` (request memory) and MongoDB. This leads to stale cache issues and extra complexity.

**Execute**:
1. Remove `req._i18nTranslations` and related getter (`getRequestTranslations`).
2. Modify `translationsAttributeFilter` to store **only** in MongoDB (keep fire‑and‑forget `setImmediate`).
3. Update `translations` endpoint to query MongoDB exclusively.
4. Add a simple in‑memory LRU cache (e.g., `lru‑cache` npm) for request‑level performance.

**Verify**: Create a multilingual string, view page, inspect network request to `/modules/apostrophe‑i18n‑content/translations` – response should come from DB. #}

### 5.3. Enforce Lean Frontend Compliance

**Locate**: All `public/js/widget.js` files across widget modules.

**Understand**: Any usage of `$` or jQuery‑specific methods will break for anonymous users when `lean: true`.

**Execute**:
1. Run a grep for `\$(` and `jQuery` in `lib/modules/*/public/js/`.
2. Replace each occurrence with `apos.utils` equivalents:
   - `$(selector)` → `document.querySelector(selector)` or `apos.utils.closest()`
   - `$.on` → `addEventListener`
   - `$.ajax` → `apos.utils.get`/`post`
3. Update `pushAsset` calls to use `when: 'lean'` for public JS, `when: 'user'` for admin‑only JS.
4. Add a pre‑commit hook that runs `npm run lint‑lean` (to be created) to detect jQuery leaks.

**Verify**: Start server, open page as anonymous user, check browser console for errors; confirm jQuery is not loaded (Network tab).

{# ### 5.4. Refactor DeepL Integration

**Locate**: `lib/modules/apostrophe‑i18n‑deepl/index.js` lines 22‑104 (`extendWidgets`).

**Understand**: The module patches `apostrophe‑widgets` prototype after construct, which is fragile and causes moog recursion warnings.

**Execute**:
1. Remove `extendWidgets` and `afterConstruct` call to it.
2. Create a proper widget extension using Apostrophe’s `improve` pattern:
   ```javascript
   self.apos.define('apostrophe‑widgets', require('./lib/deepl‑widget‑extension.js'));
   ```
3. In `deepl‑widget‑extension.js`, add `getEditorControls` method that injects DeepL buttons only for multilingual‑string fields.
4. Ensure the extension is loaded **before** widget modules construct.

**Verify**: Open any widget editor with a multilingual‑string field – the “Auto Translate” button appears and works without JavaScript errors. #}

### 5.5. Upgrade npm Dependencies

**Locate**: `package.json` lines 23‑42.

**Understand**: Several packages have known CVEs and are many major versions behind.

**Execute**:
1. Run `npm outdated` to list outdated packages.
2. For each dependency, check compatibility with Apostrophe v2.227.12:
   - `marked` → upgrade to `^14.0.0` (latest compatible)
   - `redis` → upgrade to `^4.0.0` (requires code changes for API)
   - `deepl‑node` → keep current (latest is 1.x)
   - `apostrophe` → consider upgrading to latest v2.x (2.227.12 is already latest)
3. Run `npm audit fix --force` to automatically fix vulnerabilities (may break things).
4. Test thoroughly after each upgrade.

**Verify**: `npm audit` returns zero critical vulnerabilities; server starts without deprecation warnings.


## 6. Risk Mitigation

| Risk | What could break → Verification method |
|------|-----------------------------------------|
| Deleting duplicate fields | Widgets may lose configuration → Run unit tests on each widget’s schema; manually test editing and saving. |
| MongoDB translation storage | Performance regression under high load → Load‑test with `ab` or `artillery`; monitor response times. |
| jQuery removal | Admin UI may break for logged‑in users → Test all widget editors, modals, and AJAX interactions as an admin. |
| DeepL refactor | “Auto Translate” button may disappear → Integration test with real DeepL API key (use sandbox). |
| npm upgrades | Apostrophe may fail to start due to incompatible API changes → Run full test suite and smoke‑test critical user journeys. |

## 7. Dependency Order

### Must Complete
1. **Upgrade npm dependencies** – because security fixes reduce attack surface before further changes.
2. **Consolidate widget field bundles** – because this reduces schema duplication, making subsequent widget changes easier.
3. **Enforce lean frontend compliance** – because jQuery removal affects all widget players, which may depend on field bundles.

### Can Parallelize
- **Unify i18n translation storage** (independent of frontend changes)
- **Refactor DeepL integration** (depends on widget field consolidation but can be done concurrently with lean enforcement)

### Final Cleanup
- Remove deprecated `when: 'always'` asset declarations.
- Delete unused widget modules (if any).

## 8. Reference: Principles Applied

- **Function Minimalism**: Eliminated 40+ duplicate field definitions, replaced with one shared module.
- **Framework Primitive Supremacy**: Replaced custom AJAX logic with `apos.utils.get`/`post`, used `improve` for DeepL extension.
- **Single Responsibility**: Split i18n storage (MongoDB) from presentation (filters), split widget schema from widget logic.
- **Evidence‑Based Decisions**: Each intervention cites specific file/line evidence of the problem.
- **Causal, Not Temporal**: Order based on dependency edges (security → schema → frontend) not arbitrary timelines.

---