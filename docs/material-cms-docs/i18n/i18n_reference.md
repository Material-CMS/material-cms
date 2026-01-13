# i18n Reference: Professional Implementation Guide

## Architectural Context

Material CMS implements an **API-first translation architecture** that eliminates security and performance issues of legacy systems. Translations are fetched on-demand via REST API, enabling no-page-reload language switching without exposing translations in HTML.

### Core Principles
1. **API-First**: Translations delivered via secure endpoints, not embedded in HTML
2. **Deterministic IDs**: Content-based hashes instead of sequential counters
3. **Lean Frontend**: Uses `apos.utils` instead of jQuery for public frontend
4. **Progressive Enhancement**: API → AJAX → Page reload fallback chain

## Module Architecture

### 1. `apostrophe-i18n-content` (Core Module)
**Purpose**: Primary translation module extending `apostrophe-i18n`
**Location**: `lib/modules/apostrophe-i18n-content/`

#### Key Components:
- **Custom Field Type**: `multilingual-string` with `textarea` support
- **Template Filters**: `i18n`, `i18nMeta`, `translationsAttribute`
- **API Endpoints**: `/translations` (GET), `/translate-batch` (POST)
- **Middleware**: Locale detection (cookie → Accept-Language → default)

#### Configuration (`data/local.js`):
```javascript
'apostrophe-i18n': {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  cookie: 'material-cms.locale',
  updateFiles: true
},
'apostrophe-i18n-content': {
  // API-first architecture - no additional config required
}
```

### 2. `language-switcher-widgets`
**Purpose**: Client-side language switching with API-first approach
**Location**: `lib/modules/language-switcher-widgets/`

#### Implementation Pattern:
```javascript
// Progressive enhancement chain
1. Set locale cookie
2. Fetch translations via API endpoint
3. If API fails, use AJAX navigation (apos.utils.ajaxGo)
4. Final fallback: page reload
```

### 3. Widget Modules Using i18n
- `i18n-header-widgets`: Header with multilingual text
- `i18n-text-widgets`: Text content with multilingual support
- **Note**: `i18n-text-widgets` has template bug (uses `header` instead of `text`)

### 4. `apostrophe-i18n-deepl` (Integration Ready)
**Purpose**: DeepL translation integration placeholder
**Status**: Foundation implemented, requires `DEEPL_API_KEY`

## API Reference

### Translation Fetching Endpoint
**GET** `/modules/apostrophe-i18n-content/translations`

**Parameters**:
- `ids[]` (array): Translation IDs to fetch
- `locale` (string): Target locale (defaults to request locale)

**Response**:
```json
{
  "status": "ok",
  "translations": {
    "t-abc123": "Translated text",
    "t-def456": "Another translation"
  }
}
```

**Client Usage**:
```javascript
apos.utils.get('/modules/apostrophe-i18n-content/translations', {
  ids: ['t-abc123', 't-def456'],
  locale: 'de'
}, function(err, result) {
  if (!err && result.translations) {
    // Update DOM elements with result.translations
  }
});
```

### Batch Translation Endpoint (DeepL Ready)
**POST** `/modules/apostrophe-i18n-content/translate-batch`

**Authentication**: Requires logged-in user
**Purpose**: Placeholder for DeepL integration

## Template Integration

### Filter Usage

#### 1. `i18n` Filter
```html
<h1>{{ data.widget.title | i18n }}</h1>
```

#### 2. `i18nMeta` Filter (HTML-safe for meta tags)
```html
<meta name="description" content="{{ data.page.seoDescription | i18nMeta }}">
```

#### 3. `translationsAttribute` Filter
```html
<div {{ data.widget.content | translationsAttribute }}>
  {{ data.widget.content | i18n }}
</div>
```

### Translation ID Generation
Deterministic content-based hashes ensure consistency:
```javascript
// Generation logic in apostrophe-i18n-content/index.js
var contentHash = JSON.stringify(translations);
var id = 't-' + crypto.createHash('md5')
  .update(contentHash)
  .digest('hex')
  .substring(0, 8);
```

## Field Type: `multilingual-string`

### Basic Configuration
```javascript
{
  name: 'title',
  type: 'multilingual-string',
  label: 'Title',
  required: true
}
```

### Textarea Support (New Feature)
```javascript
{
  name: 'description',
  type: 'multilingual-string',
  label: 'Description',
  textarea: true,
  rows: 5  // optional, defaults to 5
}
```

### Template Implementation
The field renders conditionally based on `textarea` property:
```html
{% if textarea %}
  <textarea class="apos-field-input apos-field-input-textarea"
            data-locale-input="{{ locale }}"
            rows="{{ data.rows or 5 }}">
  </textarea>
{% else %}
  <input type="text" class="apos-field-input"
         data-locale-input="{{ locale }}" />
{% endif %}
```

## Language Switcher Implementation

### Client-Side Logic
```javascript
function switchLocale(locale) {
  // 1. Set cookie
  document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000';
  
  // 2. Try API first
  updateTranslationsViaAPI(locale).then(function(result) {
    if (result.updated > 0) return;
    
    // 3. AJAX fallback
    if (apos.utils.ajaxGo) {
      var url = window.location.pathname + window.location.search;
      url = url.replace(/[?&]locale=[^&]*/, '');
      var separator = url.includes('?') ? '&' : '?';
      apos.utils.ajaxGo('page', url + separator + 'locale=' + locale);
    } else {
      // 4. Page reload fallback
      window.location.reload();
    }
  });
}
```

### Widget Configuration
```javascript
// language-switcher-widgets/index.js
module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Language Switcher',
  addFields: [
    {
      name: 'style',
      type: 'select',
      label: 'Switcher Style',
      choices: [
        { label: 'List of links', value: 'list', def: true },
        { label: 'Dropdown', value: 'dropdown' }
      ]
    }
  ]
};
```

## Security Architecture

### Threat Model
1. **Translation Exposure**: Translations never exposed in page source
2. **API Access**: Public endpoint for fetching, authenticated for batch operations
3. **XSS Protection**: Template system provides automatic escaping
4. **Meta Tag Safety**: `i18nMeta` filter removes HTML tags

## Performance Considerations

### Bundle Size Impact
| Component | Size | Loading Condition |
|-----------|------|-------------------|
| `apos.utils` (lean.js) | ~10KB gzipped | Always (lean mode) |
| Translation API client | ~1KB | Per widget usage |
| jQuery + dependencies | ~80KB gzipped | Only when `user` |

### Caching Strategy
1. **Browser Caching**: API responses cacheable with appropriate headers
2. **CDN Caching**: Translation endpoints cacheable at CDN level
3. **Server-Side**: Consider Redis for frequently requested translations

## Migration Status

### Completed
- ✅ API-first architecture implemented
- ✅ Deterministic translation IDs
- ✅ Lean frontend compatibility
- ✅ Textarea support for multilingual-string

### Technical Debt
1. **Critical**: `i18n-text-widgets` template bug (line 5 references `header` instead of `text`)
2. **Documentation**: Translation API doc mentions legacy artifacts that don't exist
3. **DeepL Integration**: Placeholder module needs actual implementation

## Implementation Patterns

### Creating a New i18n Widget
```javascript
// index.js
module.exports = {
  extend: 'apostrophe-widgets',
  label: 'My Multilingual Widget',
  addFields: [
    {
      name: 'content',
      type: 'multilingual-string',
      label: 'Content',
      textarea: true,
      rows: 8
    }
  ]
};
```

```html
{# widget.html #}
<div class="my-widget" {{ data.widget.content | translationsAttribute }}>
  {{ data.widget.content | i18n }}
</div>
```

### Custom Template Filter (if needed)
```javascript
// In your module's index.js
self.apos.templates.addFilter('myCustomFilter', function(value, locale) {
  var translation = self.i18nFilter(value, locale);
  // Custom processing
  return translation.toUpperCase();
});
```

## Debugging & Testing

### API Testing
```bash
# Test translation endpoint
http GET "http://localhost:3000/modules/apostrophe-i18n-content/translations?ids[]=t-abc123&locale=de"

# Test locale cookie
curl -H "Cookie: material-cms.locale=de" http://localhost:3000
```

### Client-Side Debugging
```javascript
// Check translation elements
console.log(document.querySelectorAll('[data-translation-id]').length);

// Test API response
apos.utils.get('/modules/apostrophe-i18n-content/translations', {
  ids: ['t-abc123'],
  locale: 'de'
}, function(err, result) {
  console.log('API response:', err, result);
});
```

### Template Debugging
```html
{# Add debug output #}
{{ apos.log(data.widget | dump) }}
{{ apos.log(data.widget.content.translations | dump) }}
```

## Compliance with Lean Frontend Principles

### ✅ Achieved
- Public frontend uses `apos.utils` not jQuery
- Widget players use vanilla JavaScript
- `when: 'lean'` for public assets, `when: 'user'` for admin
- AJAX utilities extend lean.js, not jQuery

### ⚠️ Admin-Only jQuery
- Admin UI (`user.js`) uses jQuery (acceptable per lean frontend guidelines)
- Materialize components loaded only for logged-in users

## DeepL Integration Roadmap

### Current State
- Module skeleton exists (`apostrophe-i18n-deepl`)
- API endpoint structure prepared
- Environment variable configuration ready

### Required Implementation
1. Actual DeepL API integration in `callDeepL` method
2. Batch translation job processing
3. Admin UI for triggering translations
4. Error handling and retry logic

## Best Practices

### Do
- Use `multilingual-string` for all user-facing text
- Apply `i18nMeta` filter for meta tag content
- Use `translationsAttribute` for dynamic translation elements
- Test with anonymous users (no jQuery available)

### Don't
- Don't expose translations in HTML source
- Don't use `when: 'always'` for assets (use `'lean'` or `'user'`)
- Don't create trivial wrapper functions around `apos.utils`
- Don't mix presentation and translation logic

## Reference: File Locations

### Core Files
- `lib/modules/apostrophe-i18n-content/index.js` - Main implementation
- `lib/modules/apostrophe-i18n-content/views/field.html` - Field template
- `lib/modules/apostrophe-i18n-content/public/js/user.js` - Admin UI

### Widget Implementations
- `lib/modules/language-switcher-widgets/` - Language switcher
- `lib/modules/i18n-header-widgets/` - Example header widget
- `lib/modules/i18n-text-widgets/` - Example text widget (has bug)

### Configuration
- `data/local.js` - i18n configuration
- `app.js` - Module registration

### Documentation
- `docs/material-cms-docs/translation_api.md` - API reference
- `docs/material-cms-docs/multilingual_string_textarea.md` - Textarea feature
- `docs/material-cms-docs/lean_frontend_assets.md` - Lean frontend context

---

**Last Updated**: 2025-01-15  
**Architecture Version**: API-First i18n v2.0  
**Compatibility**: ApostropheCMS v2.227.11+ with `lean: true`