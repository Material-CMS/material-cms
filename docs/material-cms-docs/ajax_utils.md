# AJAX Utilities (`ajax-utils.js`)

## Overview

`ajax-utils.js` provides lean, framework-aligned AJAX utilities for ApostropheCMS v2 projects using the **lean frontend** (`lean: true`). It replaces jQuery-dependent AJAX navigation with vanilla JavaScript implementations that work with Apostrophe's widget player system.

## Key Features

- **Lean mode compatible**: No jQuery dependency
- **Framework aligned**: Uses `apos.utils.get` and Apostrophe's widget player system
- **Progressive enhancement**: Falls back to page reload when AJAX fails
- **Locale preservation**: Automatically maintains `locale` parameter in AJAX requests
- **Event-driven**: Emits `apos-ajax-loaded` and `apos-ajax-appended` events
- **Infinite scroll support**: Built-in `ajaxAppend` function for paginated content

## API Reference

### `apos.utils.ajaxGo(context, url, options)`

Load content via AJAX and replace the specified context.

**Parameters:**
- `context` (String): AJAX context name (e.g., 'page')
- `url` (String): URL to load
- `options` (Object, optional):
  - `selector` (String): Custom selector for context element (default: `[data-apos-ajax-context="context"]`)
  - `loadingSelector` (String): Selector for loading indicator element
  - `push` (Boolean): Whether to update browser history (default: `true`)
  - `success` (Function): Callback after successful load

**Example:**
```javascript
// Basic usage
apos.utils.ajaxGo('page', '/about');

// With options
apos.utils.ajaxGo('gallery', '/galleries?page=2', {
  loadingSelector: '.loading-spinner',
  success: function(response) {
    console.log('Gallery loaded:', response);
  }
});
```

### `apos.utils.ajaxAppend(context, url, options)`

Append content via AJAX (for infinite scroll, load more, etc.).

**Parameters:**
- `context` (String): AJAX context name
- `url` (String): URL to load  
- `options` (Object, optional):
  - `selector` (String): Custom selector for append element (default: `[data-apos-ajax-append="context"]`)
  - `loadingSelector` (String): Selector for loading indicator
  - `success` (Function): Callback after successful append

**Example:**
```javascript
// Append next page of content
apos.utils.ajaxAppend('galleries', '/galleries?page=2');

// With loading indicator
apos.utils.ajaxAppend('articles', '/articles?page=3', {
  loadingSelector: '.loading-more',
  success: function() {
    console.log('More articles loaded');
  }
});
```

### `apos.utils.initAjaxNavigation()`

Initialize AJAX navigation (automatically called on DOM ready).

- Intercepts clicks on links with `data-apos-ajax` attribute
- Handles browser back/forward buttons
- Maintains locale parameter in navigation

## Template Integration

### 1. AJAX Context (Page Navigation)
Wrap main content with data attribute:
```html
<div data-apos-ajax-context="page">
  {% block main %}{% endblock %}
</div>
```

### 2. AJAX Append (Infinite Scroll/Load More)
Mark appendable content:
```html
<div data-apos-ajax-append="galleries">
  <!-- Content that will be appended to -->
</div>
```

### 3. AJAX Links
Add `data-apos-ajax` attribute to links:
```html
<a href="/about" data-apos-ajax="page">About Us</a>
<a href="/galleries?page=2" data-apos-ajax="galleries">Next Page</a>
```

## Infinite Scroll Implementation

### Template Setup (`indexAjax.html`)
```html
<div class="ajax-append{% if data.page.ajaxAppend %} active{% endif %}">
  
  <div data-apos-ajax-append="galleries">
    {% include "galleries-widgets:pieces.html" %}
  </div>
  
  {% if data.currentPage < data.totalPages %}
    <div class="pagination-wrapper{% if data.page.ajaxAppend %} hide{% endif %}">
      <a class="btn next" href="{{ data.url | build({ page: data.currentPage + 1, append: 1 }) }}">
        {{ data.page.buttonText or 'Load More...' }}
      </a>
    </div>
  {% endif %}
  
</div>
```

### JavaScript Initialization (`page.js`)
```javascript
// Check if it's a ajax-append page
var ajax = document.querySelector('.ajax-append.active');
if (ajax) {
  var nextSelector = ajax.querySelector('.pagination-wrapper a.next');
  if (nextSelector) {
    // Find context from data attribute
    var appendElement = ajax.querySelector('[data-apos-ajax-append]');
    var context = appendElement ? appendElement.getAttribute('data-apos-ajax-append') : 'infinite-scroll';
    
    // Set up scroll detection
    var scrollBuffer = 200;
    var isLoading = false;
    
    window.addEventListener('scroll', function() {
      if (isLoading) return;
      
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight - scrollBuffer) {
        isLoading = true;
        var nextLink = nextSelector.getAttribute('href');
        if (nextLink) {
          apos.utils.ajaxAppend(context, nextLink, {
            afterContentLoaded: function() {
              isLoading = false;
              // Update nextSelector for next page
              nextSelector = ajax.querySelector('.pagination-wrapper a.next');
            }
          });
        }
      }
    });
  }
}
```

## Events

### `apos-ajax-loaded`
Fired after `ajaxGo` completes successfully.

**Event Data:**
```javascript
{
  context: 'page',      // The AJAX context
  url: '/about',        // The URL loaded
  element: element      // The context element
}
```

**Usage:**
```javascript
apos.utils.on(document.body, 'apos-ajax-loaded', function(event) {
  console.log('AJAX loaded:', event.detail.context, event.detail.url);
  // Initialize any new widgets or components
});
```

### `apos-ajax-appended`
Fired after `ajaxAppend` completes successfully.

**Event Data:**
```javascript
{
  context: 'galleries', // The AJAX context
  url: '/galleries?page=2', // The URL loaded
  element: element      // The appended element
}
```

**Usage:**
```javascript
apos.utils.on(document.body, 'apos-ajax-appended', function(event) {
  console.log('Content appended:', event.detail.context);
  // Run widget players on new content
  apos.utils.runPlayers(event.detail.element);
});
```

## Locale Parameter Handling

`ajax-utils.js` automatically preserves the `locale` parameter in AJAX requests by:

1. Reading the `material-cms.locale` cookie
2. Adding `?locale=xx` or `&locale=xx` to URLs when needed
3. Ensuring locale state persists across AJAX navigation

**Manual locale switching example:**
```javascript
function switchLocale(locale) {
  // Set cookie
  document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000';
  
  // Update current URL with locale parameter
  var currentUrl = window.location.pathname + window.location.search;
  currentUrl = currentUrl.replace(/[?&]locale=[^&]*/, '');
  var separator = currentUrl.includes('?') ? '&' : '?';
  var url = currentUrl + separator + 'locale=' + locale;
  
  // Use AJAX navigation
  apos.utils.ajaxGo('page', url);
}
```

## Error Handling & Fallbacks

### Automatic Fallbacks
1. **Context not found**: Falls back to `window.location.href = url`
2. **AJAX request fails**: Falls back to page reload
3. **Missing response context**: Falls back to page reload

### Manual Error Handling
```javascript
apos.utils.ajaxGo('page', '/about', {
  success: function(response) {
    console.log('Success:', response);
  },
  // Note: No error callback - automatic fallback handles errors
});

// For custom error handling, listen for network errors:
window.addEventListener('error', function(event) {
  if (event.target.tagName === 'SCRIPT' && event.target.src.includes('ajax')) {
    console.warn('AJAX script error:', event.error);
  }
});
```

## Best Practices

### 1. Progressive Enhancement
Always design for page reload first, then enhance with AJAX:
```html
<!-- Works with or without JavaScript -->
<div data-apos-ajax-context="page">
  <a href="/about" data-apos-ajax="page">About</a>
</div>
```

### 2. Loading Indicators
Provide visual feedback during AJAX operations:
```html
<div class="loading-indicator" style="display: none;">
  Loading...
</div>
```

```javascript
apos.utils.ajaxGo('page', '/about', {
  loadingSelector: '.loading-indicator'
});
```

### 3. Widget Player Integration
Ensure new content has widget players executed:
```javascript
// ajax-utils.js does this automatically via apos.utils.runPlayers()
// Manual execution if needed:
apos.utils.runPlayers(newContentElement);
```

### 4. State Management
Update browser history for AJAX navigation:
```javascript
// ajaxGo does this automatically (options.push = true)
// Disable for certain operations:
apos.utils.ajaxGo('modal', '/login', { push: false });
```

## Migration from jQuery-based AJAX

### Before (jQuery):
```javascript
if (apos.ui && apos.ui.ajaxGo) {
  apos.ui.ajaxGo('page', url);
}
```

### After (lean mode):
```javascript
if (apos.utils && apos.utils.ajaxGo) {
  apos.utils.ajaxGo('page', url);
} else {
  window.location.href = url; // Fallback
}
```

## Common Patterns

### 1. Language Switcher Integration
```javascript
function switchLocale(locale) {
  // Set cookie
  document.cookie = 'material-cms.locale=' + locale + '; path=/';
  
  // Update URL
  var url = window.location.pathname + window.location.search;
  url = url.replace(/[?&]locale=[^&]*/, '');
  var separator = url.includes('?') ? '&' : '?';
  url = url + separator + 'locale=' + locale;
  
  // Use AJAX if available
  if (apos.utils && apos.utils.ajaxGo) {
    apos.utils.ajaxGo('page', url);
  } else {
    window.location.href = url;
  }
}
```

### 2. Infinite Scroll with Load More Button
```html
<div data-apos-ajax-append="products">
  <!-- Product list -->
</div>

<button class="load-more" onclick="loadMoreProducts()">
  Load More
</button>

<script>
function loadMoreProducts() {
  var nextPage = document.querySelector('.pagination .next');
  if (nextPage) {
    apos.utils.ajaxAppend('products', nextPage.href, {
      afterContentLoaded: function() {
        // Update button or hide if no more pages
        var newNextPage = document.querySelector('.pagination .next');
        if (!newNextPage) {
          document.querySelector('.load-more').style.display = 'none';
        }
      }
    });
  }
}
</script>
```

### 3. AJAX Form Submission
```html
<form data-apos-ajax-form="contact">
  <!-- Form fields -->
  <button type="submit">Send</button>
</form>

<script>
document.querySelector('[data-apos-ajax-form]').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var form = this;
  var context = form.getAttribute('data-apos-ajax-form');
  var url = form.action;
  var formData = new FormData(form);
  
  // Convert to URL-encoded data
  var params = new URLSearchParams(formData).toString();
  
  apos.utils.ajaxGo(context, url + '?' + params, {
    push: false,
    afterContentLoaded: function() {
      // Show success message
      form.innerHTML = '<div class="success">Message sent!</div>';
    }
  });
});
</script>
```

## Troubleshooting

### Common Issues

1. **AJAX not working**
   - Check `lean: true` is set in `apostrophe-assets`
   - Verify `ajax-utils.js` is in assets scripts array
   - Check browser console for JavaScript errors

2. **Widget players not running on new content**
   - Ensure `apos.utils.runPlayers()` is called (ajax-utils.js does this automatically)
   - Check widget has `play` method defined
   - Verify widget data attributes are present

3. **Locale parameter lost in AJAX**
   - Check `material-cms.locale` cookie exists
   - Verify URL has `locale` parameter
   - Test with `curl -H "Cookie: material-cms.locale=de" http://localhost:3000`

4. **Browser history not updating**
   - Ensure `options.push` is not `false`
   - Check `window.history.pushState` is available
   - Verify URL is valid (no hash fragments interfering)

### Debugging Commands
```bash
# Check if ajax-utils.js is loaded
curl -s http://localhost:3000 | grep -o 'ajax-utils'

# Test AJAX endpoint
curl -s "http://localhost:3000/galleries?page=2&append=1"

# Check locale cookie handling
curl -s -H "Cookie: material-cms.locale=de" http://localhost:3000 | grep -o 'data-translations'
```

## Performance Considerations

1. **Bundle Size**: `ajax-utils.js` is ~7KB minified
2. **Caching**: Leverage browser caching for static assets
3. **Debouncing**: Implement scroll debouncing for infinite scroll
4. **Connection Check**: Consider adding offline detection

## See Also

- [Apostrophe Lean Frontend Assets](docs/apostrophe-v2-docs/core-concepts/front-end-assets/lean-frontend-assets.md)
- [Translation Configuration](translation_configuration.md)
- [Custom Schema Field Types](custom_shema_field_type.md)

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-10  
**Compatibility**: ApostropheCMS v2.227.11+ with `lean: true`