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
  // Expose translations in HTML needed for ajax language switch (default: true)
  // Set to false to hide translations from HTML and require page reload
  exposeTranslations: true,
}
```

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

### **For New Widgets**
Always use the filter:
```html
<div {{ data.widget.content | translationsAttribute }}>
  {{ data.widget.content | i18n }}
</div>
```

## TROUBLESHOOTING

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