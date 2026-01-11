# Lean Frontend Assets: ApostropheCMS v2 Without jQuery

## Overview

Material CMS uses ApostropheCMS v2's **lean frontend assets** system, which eliminates jQuery and other heavy libraries from the frontend for anonymous users. This reduces page weight, improves performance, and aligns with modern vanilla JavaScript practices.

### Core Configuration

```javascript
// app.js
modules: {
  'apostrophe-assets': {
    lean: true
  }
}
```

With `lean: true`, Apostrophe pushes only the minimal `apos.utils` library (~10KB gzipped) instead of jQuery, lodash, async, and other default libraries. This is the foundation for a jQuery-free frontend.

## Asset Bundling with `apostrophe-assets`

### How Assets Are Bundled

The `apostrophe-assets` module handles asset compilation and delivery:

1. **Development Mode**: Assets are served individually with hot reload
2. **Production Mode**: Assets are concatenated, minified, and versioned
3. **Conditional Loading**: Assets can be targeted to specific contexts using `when` clauses

### Configuration Example

```javascript
// lib/modules/apostrophe-assets/index.js
module.exports = {
  jQuery: 3, // Only loaded when user is logged in (admin UI)
  stylesheets: [
    { name: 'components/basic' },
    { name: 'user-overrides', when: 'user' }
  ],
  scripts: [
    { name: 'ajax-utils' }, // Loaded for all users (lean mode)
    { name: 'vendor/materialize/admin-ui', when: 'user' }
  ]
};
```

### Asset Loading Conditions

| Condition | Description | Use Case |
|-----------|-------------|----------|
| `lean` (default) | Loaded for all users when `lean: true` | Frontend widgets, public JS |
| `user` | Loaded only when user is logged in | Admin UI, editing tools |

**Critical**: The `always` condition is **deprecated and should not be used**. When `lean: true` is set, `when: 'always'` behaves like `when: 'user'`, but this is an implementation detail that may change. For public assets, explicitly use `when: 'lean'`. For admin-only assets, use `when: 'user'`.

**No New Bloat Principle**: Do not create new assets with `when: 'always'`. This project's direction is to eliminate legacy jQuery dependencies and move toward a pure JavaScript system. The `ajax-utils.js` extension demonstrates how to build lean functionality without jQuery.

## Widget Players: `apos.utils.widgetPlayers`

### What Are Widget Players?

Widget players are JavaScript functions that enhance individual widget instances after they're rendered. They replace jQuery-based widget players in lean mode.

### Registration Pattern

```javascript
// lib/modules/my-widget/public/js/widget.js
apos.utils.widgetPlayers['my-widget'] = function(el, data, options) {
  // el: DOM element of the widget (not jQuery)
  // data: Widget properties (from database)
  // options: Area/singleton options
  
  // Enhance this specific widget instance
  if (data.autoPlay) {
    el.querySelector('video').play();
  }
};
```

### Key Principles

1. **Single Responsibility**: Each player enhances only its own widget element
2. **Idempotent**: Players are guaranteed to run once per widget
3. **Framework-Aligned**: Use `apos.utils` methods, not jQuery
4. **Scoped Enhancement**: Don't query the entire document; work within `el`

### Automatic Execution

Widget players are automatically executed:
- On DOM ready via `apos.utils.runPlayers()`
- After AJAX content loading (via `apos.utils.runPlayers(newContent)`)
- When editors add widgets in admin UI (via `apos.on('enhance')`)

## Widget.js vs User.js: Separation of Concerns

### Frontend Widgets (`widget.js`)

**Location**: `lib/modules/[module-name]/public/js/widget.js`

**Purpose**: Enhance widget presentation for all users

**Loading**: Pushed with `{ when: 'lean' }` (public)

**Characteristics**:
- Uses vanilla JavaScript (no jQuery)
- Relies on `apos.utils` utilities
- Minimal, focused on presentation
- Example: Lightbox initialization, slider setup

### Admin Widgets (`user.js` or `leanUser.js`)

**Location**: `lib/modules/[module-name]/public/js/user.js` (or `leanUser.js`)

**Purpose**: Provide editing interface for logged-in users

**Loading**: Pushed with `{ when: 'user' }` (admin only)

**Characteristics**:
- May use jQuery (available in admin context)
- Handles schema population, validation
- Manages server communication for updates
- Example: Palette widget color picker

### Example Module Structure

```
lib/modules/my-widget/
├── index.js
├── public/
│   ├── js/
│   │   ├── widget.js          # Public enhancement (lean)
│   │   └── leanUser.js        # Admin interface (user)
│   └── views/
│       └── widget.html
```

### Asset Pushing in Module

```javascript
// lib/modules/my-widget/index.js
construct: function(self, options) {
  // Public widget enhancement
  self.pushAsset('script', 'widget', { when: 'lean' });
  
  // Admin-only functionality
  self.pushAsset('script', 'leanUser', { when: 'user' });
}
```

## AJAX Utilities: Extending `lean.js`

### The `ajax-utils.js` Extension

Material CMS extends Apostrophe's lean utilities with `ajax-utils.js` to provide jQuery-free AJAX navigation and content loading.

### Relationship to `lean.js`

- **Base**: `node_modules/apostrophe/lib/modules/apostrophe-browser-utils/public/js/lean.js`
- **Extension**: `lib/modules/apostrophe-assets/public/js/ajax-utils.js`

### Key Extensions

| Function | Purpose | Base Dependency |
|----------|---------|-----------------|
| `apos.utils.ajaxGo()` | Replace content via AJAX | `apos.utils.get()` |
| `apos.utils.ajaxAppend()` | Append content (infinite scroll) | `apos.utils.get()` |
| `apos.utils.initAjaxNavigation()` | Handle AJAX links & history | `apos.utils.onReady()` |

### Implementation Pattern

```javascript
// Extends apos.utils namespace
if (!apos.utils.ajaxGo) {
  apos.utils.ajaxGo = function(context, url, options) {
    // Uses apos.utils.get() for lean compatibility
    apos.utils.get(url, null, function(err, response) {
      // Process response, update DOM
      apos.utils.runPlayers(updatedElement);
    });
  };
}
```

### Locale Preservation

`ajax-utils.js` automatically preserves locale parameters across AJAX navigation by reading the `material-cms.locale` cookie and appending `?locale=xx` to URLs.

## Migration from jQuery to Vanilla JavaScript

### Core Philosophy

**Use framework primitives first, create utilities only when necessary. Avoid legacy patterns like `when: 'always'` that introduce bloat.**

### Available Framework Primitives

#### DOM Manipulation
```javascript
// Instead of $(selector)
document.querySelector('.my-class');
document.querySelectorAll('.my-class');

// Instead of $(el).find()
el.querySelectorAll('.child');

// Instead of $(el).closest()
apos.utils.closest(el, '.ancestor');

// Class manipulation
apos.utils.addClass(el, 'active');
apos.utils.removeClass(el, 'hidden');
```

#### Event Handling
```javascript
// Instead of $(el).on()
el.addEventListener('click', handler);

// Instead of $(el).trigger()
apos.utils.emit(el, 'custom-event', { data: value });

// DOM ready
apos.utils.onReady(function() { /* ... */ });
```

#### AJAX Requests
```javascript
// Instead of $.ajax or $.getJSON
apos.utils.get('/api/data', { param: 'value' }, function(err, response) {
  // Node-style callback
});

apos.utils.post('/api/save', { data: values }, function(err, response) {
  // Automatic CSRF token handling
});
```

#### Object/Array Utilities
```javascript
// Instead of _.each
array.forEach(function(item) { /* ... */ });

// Instead of _.extend
apos.utils.assign(target, source);

// Instead of _.find
array.find(function(item) { return item.id === target; });
```

### When to Create New Utilities

Create a new utility function only when:

1. **Complexity**: Encapsulates non-trivial logic used in 3+ places
2. **Framework Gap**: No existing `apos.utils` method covers the need
3. **Single Responsibility**: Does one thing well
4. **Reusability**: Generic enough for multiple widget types

### Anti-Patterns to Avoid

```javascript
// ❌ DON'T: Create trivial wrappers
function getElement(selector) {
  return document.querySelector(selector); // Just use the primitive directly
}

// ❌ DON'T: Reinvent framework utilities
function ajaxGet(url, callback) {
  // Use apos.utils.get() instead
}

// ❌ DON'T: Mix presentation and logic in widgets
// Keep widget players focused on DOM enhancement
```

## Implementation Guide

### Creating a New Widget with Lean Support

#### 1. Module Structure
```javascript
// lib/modules/my-widget/index.js
module.exports = {
  extend: 'apostrophe-widgets',
  label: 'My Widget',
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
```

#### 2. Frontend Enhancement
```javascript
// lib/modules/my-widget/public/js/widget.js
apos.utils.widgetPlayers['my-widget'] = function(el, data, options) {
  // Use vanilla JS, not jQuery
  var button = el.querySelector('button');
  if (button && data.autoClick) {
    button.addEventListener('click', function() {
      apos.utils.emit(el, 'widget-activated');
    });
  }
};
```

#### 3. Admin Interface (if needed)
```javascript
// lib/modules/my-widget/public/js/leanUser.js
// Only loaded when user is logged in
(function() {
  if (window.$) {
    // jQuery available for admin UI
    $('[data-my-widget]').on('change', function() {
      // Admin-specific logic
    });
  }
})();
```

#### 4. Template
```html
{# lib/modules/my-widget/views/widget.html #}
<div data-apos-widget="my-widget"
  data='{{ data.widget | jsonAttribute }}'
  data-options='{{ data.options | jsonAttribute }}'>
  <button>Activate</button>
</div>
```

### Adding AJAX Navigation to a Page

#### 1. Template Context
```html
<div data-apos-ajax-context="page">
  {% block main %}{% endblock %}
</div>

<a href="/next-page" data-apos-ajax="page">Next</a>
```

#### 2. JavaScript Integration
```javascript
// Page-specific JS (loaded via apostrophe-assets)
apos.utils.onReady(function() {
  // Custom AJAX handling if needed
  apos.utils.on(document.body, 'apos-ajax-loaded', function(event) {
    console.log('Page loaded via AJAX:', event.detail.url);
  });
});
```

## Performance Considerations

### Bundle Size Impact

| Asset Type | Typical Size | Loading Condition |
|------------|--------------|-------------------|
| `lean.js` (apos.utils) | ~10KB gzipped | Always (lean mode) |
| `ajax-utils.js` | ~3KB gzipped | Always (lean mode) |
| Widget-specific JS | 1-5KB each | Per widget usage |
| jQuery + lodash | ~80KB gzipped | Only when `user` |

### Best Practices

1. **Lazy Loading**: Consider dynamic imports for large widget enhancements
2. **Debouncing**: Use for scroll/resize handlers in infinite scroll
3. **Event Delegation**: Attach listeners to parent elements when possible
4. **Memory Management**: Clean up event listeners in widget players if widgets can be removed

## Debugging and Testing

### Checking Lean Mode

```javascript
// Browser console
console.log('Lean mode:', apos.lean); // Should be true
console.log('jQuery available:', typeof $ !== 'undefined'); // Should be false (anonymous)
```

### Verifying Asset Loading

```bash
# Check which scripts are loaded
curl -s http://localhost:3000 | grep -o 'src="[^"]*\.js"' | grep -v jquery

# Test AJAX endpoints
http --headers "http://localhost:3000/page?append=1"
```

### Widget Player Debugging

```javascript
// Add to widget player for debugging
apos.utils.widgetPlayers['my-widget'] = function(el, data, options) {
  console.log('Widget player executing:', data._id);
  console.log('Element:', el);
  console.log('Data:', data);
};
```

## Migration Checklist

### From jQuery-based to Lean

- [ ] Set `lean: true` in `apostrophe-assets` configuration
- [ ] Audit all `widget.js` files for jQuery usage
- [ ] Replace `$()` with `document.querySelector()` and `apos.utils` methods
- [ ] Convert `$.ajax()` to `apos.utils.get()`/`post()`
- [ ] Update event binding from `.on()` to `addEventListener()`
- [ ] **Eliminate `when: 'always'`** - Replace with `when: 'lean'` for public assets or `when: 'user'` for admin
- [ ] Test with anonymous users (no jQuery)
- [ ] Verify admin functionality still works (jQuery available for users)

### Common jQuery Replacements

| jQuery Pattern | Vanilla JS Replacement |
|----------------|------------------------|
| `$(selector)` | `document.querySelector(selector)` |
| `$(el).find()` | `el.querySelectorAll()` |
| `$(el).parent()` | `el.parentElement` |
| `$(el).closest()` | `apos.utils.closest(el, selector)` |
| `$(el).addClass()` | `apos.utils.addClass(el, className)` |
| `$(el).removeClass()` | `apos.utils.removeClass(el, className)` |
| `$(el).on()` | `el.addEventListener()` |
| `$(el).trigger()` | `apos.utils.emit(el, eventName)` |
| `$(el).hide()` | `el.style.display = 'none'` |
| `$(el).show()` | `el.style.display = ''` |
| `$(el).attr()` | `el.getAttribute()` / `el.setAttribute()` |
| `$(el).data()` | `el.dataset` |
| `$.each()` | `array.forEach()` |
| `$.extend()` | `apos.utils.assign()` |
| `$.ajax()` | `apos.utils.get()` / `apos.utils.post()` |

## Conclusion

Material CMS's lean frontend implementation demonstrates that complex CMS functionality can be delivered without jQuery dependency. By leveraging Apostrophe's `apos.utils` primitives and following the widget player pattern, developers can create performant, maintainable frontend code that works seamlessly across both public and admin contexts.

The key architectural decisions:
1. **Framework primitives over custom utilities**
2. **Clear separation between public and admin JavaScript**
3. **Progressive enhancement with AJAX utilities**
4. **Minimal bundle size through conditional loading**

This approach not only improves performance but also prepares the codebase for Apostrophe 3.x, which will use the lean frontend exclusively.

---

**See Also**:
- [Apostrophe Lean Frontend Documentation](docs/apostrophe-v2-docs/core-concepts/front-end-assets/lean-frontend-assets.md)
- [AJAX Utilities](ajax_utils.md)
- [Translation Configuration](translation_configuration.md)
- [Custom Schema Field Types](custom_shema_field_type.md)

**Version**: 1.0.0  
**Last Updated**: 2025-01-10  
**Compatibility**: ApostropheCMS v2.227.11+ with `lean: true`