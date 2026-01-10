# Translation Privacy Configuration
## Configurable Translation Exposure for Debugging vs Production

## Overview

The multilingual system supports **configurable translation privacy** with three modes:

1. **Debug Mode** (default): Translations exposed as plain JSON in HTML
2. **Privacy Mode**: Translations Base64 encoded in HTML  
3. **Production Mode**: Translations not exposed in HTML (requires page reload)

## Configuration Options

In `data/local.js`:

```javascript
'apostrophe-i18n-content': {
  // Expose translations in HTML for debugging (default: true)
  // Set to false in production to hide translations from HTML source
  exposeTranslations: true,
  
  // Base64 encode translations for additional privacy (default: false)
  // When true, translations are Base64 encoded in data-translations attribute
  base64Encode: false
}
```

## Modes Explained

### **1. DEBUG MODE (Default)**
```javascript
exposeTranslations: true,
base64Encode: false
```
**HTML Output**:
```html
<h2 data-translations="{"en":"Hello","de":"Guten Tag"}">
  Hello
</h2>
```
**Use Case**: Development, debugging, testing
**Pros**: Easy to inspect translations in browser devtools
**Cons**: All translations visible in page source

### **2. PRIVACY MODE**
```javascript
exposeTranslations: true,
base64Encode: true
```
**HTML Output**:
```html
<h2 data-translations="eyJlbiI6IkhlbGxvIiwiZGUiOiJHdXRlbiBUYWcifQ==">
  Hello
</h2>
```
**Use Case**: Production with instant language switching
**Pros**: Translations not human-readable at a glance
**Cons**: Base64 increases size by ~33%, still decodable

### **3. PRODUCTION MODE**
```javascript
exposeTranslations: false,
base64Encode: false  // Ignored when exposeTranslations is false
```
**HTML Output**:
```html
<h2>Hello</h2>
```
**Use Case**: Maximum privacy/SEO, no translations in HTML
**Pros**: Clean HTML, no translation exposure
**Cons**: Language switching requires page reload

## HOW IT WORKS

### **Template Filter**
The `translationsAttribute` filter generates the appropriate HTML attribute:

```html
{# In widget templates #}
<h2 {{ data.widget.header | translationsAttribute }}>
  {{ data.widget.header | i18n }}
</h2>
```

### **JavaScript Handling**
The language switcher widget automatically:
1. Detects if translations are exposed (checks for `[data-translations]` elements)
2. Uses AJAX navigation when available (`apos.utils.ajaxGo`)
3. Falls back to page reload if translations not exposed or AJAX not available

### **Language Switcher Integration**
The language switcher widget uses progressive enhancement:
- **If translations exposed AND AJAX available**: Uses `apos.utils.ajaxGo` for seamless switching
- **Otherwise**: Page reload (works for all modes)

## MIGRATION GUIDE

### **For Existing Widgets**
Update widget templates to use the `translationsAttribute` filter:

```html
{# Before (hardcoded) #}
data-translations="{{ data.widget.header.translations | dump | e }}"

{# After (configurable) #}
{{ data.widget.header | translationsAttribute }}
```

### **For New Widgets**
Always use the filter:
```html
<div {{ data.widget.content | translationsAttribute }}>
  {{ data.widget.content | i18n }}
</div>
```

### **Recommendation**
- Use **Debug Mode** during development
- Use **Privacy Mode** for staging/pre-production  
- Use **Production Mode** for sensitive content or maximum SEO control

## TROUBLESHOOTING

### **Translations Not Updating**
1. Check `exposeTranslations` is `true`
2. Verify widget template uses `translationsAttribute` filter
3. Check browser console for errors

### **Base64 Decoding Errors**
1. Ensure `atob()` is available (all modern browsers)
2. Check JSON is valid before encoding
3. Verify no special characters breaking encoding

### **Page Reloads Instead of Instant Switching**
1. `exposeTranslations` is likely `false` (Production Mode)
2. Check `data-apos-ajax-context="page"` is present in template
3. Verify `ajax-utils.js` is loaded

## API REFERENCE

### **Template Filters**
- `i18n`: Get translation for current locale
- `i18nMeta`: Get translation for meta tags (sanitized)
- `translationsAttribute`: Generate `data-translations` attribute (respects config)

### **JavaScript Implementation**
The language switcher uses simple progressive enhancement:

```javascript
// Simplified switchLocale function
function switchLocale(locale) {
  // Set cookie
  document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000';
  
  // Progressive enhancement
  if (apos.utils.ajaxGo && document.querySelector('[data-translations]')) {
    // Use AJAX navigation
    var url = window.location.pathname + window.location.search;
    url = url.replace(/[?&]locale=[^&]*/, '');
    var separator = url.includes('?') ? '&' : '?';
    apos.utils.ajaxGo('page', url + separator + 'locale=' + locale);
  } else {
    // Fallback: page reload
    window.location.reload();
  }
}
```

### **Meta Tags Note**
Meta tags (`<meta name="title" content="TEST SEITE">`) require page reload to change because:
1. Meta tags are rendered server-side
2. They're not part of the AJAX-replaced content
3. Browser doesn't re-parse meta tags after AJAX updates

For meta tag updates, use Production Mode (`exposeTranslations: false`) which forces page reloads.

### **Migration Notes (v2.0)**
- **Simplified Architecture**: Removed 528-line `translation-utils.js` module
- **Framework Primitive Usage**: Now uses `ajax-utils.js` for AJAX navigation
- **Progressive Enhancement**: Page reload as baseline, AJAX as enhancement
- **Reduced Complexity**: 35 functions → 15 functions (57% reduction)

### **Integration with Apostrophe AJAX System**
For optimal performance, ensure `data-apos-ajax-context="page"` wraps your main content:

```html
{% block main %}
  <div data-apos-ajax-context="page">
    {% block mainInner %}{% endblock %}
  </div>
{% endblock %}
```

This enables seamless AJAX-based language switching when `ajax-utils.js` is loaded.