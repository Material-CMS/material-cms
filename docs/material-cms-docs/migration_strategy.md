# Migration Strategy: Moving Away from Apostrophe CMS

## Context

Material CMS is built on Apostrophe CMS v2, which is near end‑of‑life. The codebase has accumulated 40+ custom modules that rely on Apostrophe‑specific APIs (`self.apos.utils`, `self.pushAsset`, `self.apos.schemas`, etc.). The goal is to extract the functions we actually need and migrate to a lighter, maintainable stack.

## 1. Core Apostrophe Dependencies Used

| Category | Specific APIs | Usage Count | Criticality |
|----------|---------------|-------------|-------------|
| **Module system** | `extend`, `construct`, `afterConstruct`, `self.apos.modules` | Every module | High – defines module lifecycle |
| **Database** | `self.apos.db.collection`, `self.apos.db.find` | 5+ modules | High – data persistence |
| **Schemas** | `self.apos.schemas.addFieldType`, `converters` | 2 modules (i18n, forms) | Medium – custom field types |
| **Templates** | `self.apos.templates.addFilter`, `self.apos.templates.safe`, `contextReq` | 4+ modules | High – frontend rendering |
| **Assets** | `self.pushAsset`, `when: 'lean'/'user'` | 20+ modules | Medium – asset loading |
| **Utilities** | `self.apos.utils.log`, `generateId`, `get/post`, `runPlayers`, `emit`, `onReady` | 30+ files | High – core utilities |
| **Tasks** | `self.apos.tasks.add` | 1 module | Low – CLI tasks |
| **Middleware** | `self.apos.app.use` | 2 modules | Medium – locale detection |
| **i18n base** | `apostrophe-i18n` locale config | 1 module | High – locale detection |
| **Widget/Piece base** | `apostrophe-widgets`, `apostrophe-pieces` | 20+ modules | High – content types |

## 2. What We Actually Need

### Business Logic (Keep)
- **Multilingual field type** (`multilingual‑string`) with translation storage (MongoDB + LRU cache).
- **DeepL auto‑translate** integration for editors.
- **Markdown processing** with i18n‑aware filter.
- **Widget players** – vanilla JS enhancements for each widget type (card, gallery, etc.).
- **AJAX navigation** – lean frontend utilities (`ajax‑utils.js`).
- **Custom schema fields** for forms (select, radio, etc.).
- **Piece ordering** – custom ordering logic for galleries, people, texts.

### Framework Services (Replace)
- **Module lifecycle** – can be replaced with simple class‑based registration.
- **Database abstraction** – replace with direct MongoDB driver usage (or Mongoose).
- **Template filters** – replace with Nunjucks (or another engine) directly.
- **Asset pipeline** – replace with a build system (Vite, Webpack) and runtime asset manifest.
- **Utility functions** – re‑implement a minimal set (`log`, `generateId`, `http`, `dom`).
- **Widget base class** – implement a lightweight widget registry that renders HTML and attaches players.

## 3. Migration Principles

1. **Zero‑downtime incremental migration** – keep Apostrophe running while new components are developed alongside.
2. **API shimming** – create compatibility layers that mimic `self.apos.*` but delegate to new implementations.
3. **Extract, don’t rewrite** – identify discrete modules that can be extracted as standalone npm packages.
4. **Test‑driven extraction** – each extracted component must have unit tests before switching over.

## 4. Proposed Phases

### Phase 1: Extract Utilities and Database Layer (3–4 weeks)
- **Goal**: Replace `self.apos.utils` and `self.apos.db` with our own implementations.
- **Actions**:
  1. Create `@material‑cms/utils` package with `log`, `generateId`, `http.get/post`, `dom.ready`, `emit`.
  2. Create `@material‑cms/db` package with MongoDB connection pooling, collection helpers, and cursor wrapper.
  3. In existing modules, conditionally use new utilities via a shim: `const { log } = require('../shims/apos')`.
  4. Update `ajax‑utils.js` to use new `http` module instead of `apos.utils.get`.
- **Risk**: Low – utilities are stateless and can be swapped gradually.

### Phase 2: Replace Template Engine Dependencies (2–3 weeks)
- **Goal**: Remove `self.apos.templates` dependency.
- **Actions**:
  1. Extract template filters (`i18n`, `i18nMeta`, `markdown`, `i18nMarkdown`) as standalone Nunjucks extensions.
  2. Replace `self.apos.templates.safe` with Nunjucks’ built‑in `safe` filter.
  3. Replace `self.apos.templates.contextReq` with a middleware that stores `req` in `res.locals`.
  4. Update all widget templates to use new filter syntax (no functional change).
- **Risk**: Medium – template rendering is pervasive; need to ensure parity.

### Phase 3: Build Lightweight Widget System (4–6 weeks)
- **Goal**: Replace `apostrophe‑widgets` and `apostrophe‑pieces` base classes.
- **Actions**:
  1. Design a widget registry that:
     - Loads widget definitions from JSON schema.
     - Renders HTML via Nunjucks templates.
     - Attaches JavaScript players (`widget.js`) on DOM ready.
  2. Create a piece manager that handles MongoDB CRUD, joins, and permissions.
  3. Migrate one widget module (e.g., `card‑widgets`) to the new system, keeping both old and new implementations side‑by‑side.
  4. Gradually migrate remaining widgets.
- **Risk**: High – core content rendering; requires thorough testing.

### Phase 4: Replace Asset Pipeline (2–3 weeks)
- **Goal**: Eliminate `self.pushAsset` and `when` conditions.
- **Actions**:
  1. Implement a build‑time asset manifest (Webpack/Vite) that outputs `manifest.json`.
  2. Create runtime helper `loadAsset(type, name)` that reads from manifest.
  3. Replace `self.pushAsset` calls with manifest references.
  4. Use conditional loading based on `lean` vs `user` via server‑side template logic.
- **Risk**: Medium – frontend asset loading must remain performant.

### Phase 5: Remove Apostrophe Module System (3–4 weeks)
- **Goal**: Replace moog with a simple class‑based registry.
- **Actions**:
  1. Write a lightweight module loader that calls `construct`/`afterConstruct` similarly to Apostrophe.
  2. Convert each module from `module.exports = { extend: ... }` to ES6 classes.
  3. Update `app.js` to use new loader.
  4. Remove Apostrophe dependency from `package.json`.
- **Risk**: High – module lifecycle intricacies may cause subtle bugs.

### Phase 6: Final Cleanup and Performance Tuning (2 weeks)
- **Goal**: Remove all Apostrophe code, optimize performance.
- **Actions**:
  1. Delete `node_modules/apostrophe` and all Apostrophe‑related modules.
  2. Run full regression test suite.
  3. Benchmark and optimize database queries, frontend load time.
  4. Update documentation (`AGENTS.md`, `README`).

## 5. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Business logic regression** | Maintain parallel runs during migration; use A/B testing for new components. |
| **Developer productivity hit** | Keep migration phases short; provide clear shims and documentation. |
| **Performance degradation** | Profile each phase; compare Lighthouse scores before/after. |
| **Loss of Apostrophe community plugins** | Identify which plugins are used (e.g., `apostrophe‑forms`, `apostrophe‑site‑map`) and decide to re‑implement or drop. |

## 6. Immediate Next Steps

1. **Audit plugin usage** – list all Apostrophe modules in `app.js` and decide keep/drop.
2. **Create `shims/apos.js`** – implement `utils.log`, `utils.generateId`, `db.collection` as pass‑through to Apostrophe (later replace).
3. **Extract one utility module** – pick `ajax‑utils.js` and refactor to use standalone `http` module.
4. **Set up CI with regression tests** – ensure each extraction passes existing tests.

## 7. Long‑Term Benefits

- **Reduced bundle size** – remove jQuery, Apostrophe’s client‑side library.
- **Faster performance** – leaner server‑side rendering, optimized database queries.
- **Full control** – no dependency on deprecated framework.
- **Easier upgrades** – own versioning, ability to adopt modern ES modules, TypeScript.

## 8. Conclusion

Migrating away from Apostrophe is a significant but achievable undertaking. By focusing on extracting the functions we actually need and replacing framework services incrementally, we can evolve Material CMS into a sustainable, high‑performance system without a risky “big bang” rewrite.

The proposed phases balance risk and velocity, allowing the team to deliver value continuously while systematically removing Apostrophe dependencies.