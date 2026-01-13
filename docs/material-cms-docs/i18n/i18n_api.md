# Translation API Technical Reference
## API-First Translation System with DeepL Integration Readiness

## Overview

Material CMS uses an **API-first translation architecture** that eliminates the security and performance issues of legacy translation systems. Translations are fetched on-demand via REST API, enabling:

1. **No-page-reload language switching** without exposing translations in HTML
2. **Secure translation delivery** - translations only accessible when needed
3. **DeepL integration ready** - API endpoints prepared for automated translation
4. **Lean frontend compatibility** - uses `apos.utils.get()` instead of jQuery
5. **Deterministic translation IDs** - content-based hashes instead of sequential counters

## Current Architecture

### Core Components

1. **`apostrophe-i18n-content`** - Primary translation module
   - Extends `apostrophe-i18n` for locale configuration
   - Provides template filters (`i18n`, `i18nMeta`, `translationsAttribute`)
   - Implements translation API endpoints
   - Manages request-specific translation storage

2. **`language-switcher-widgets`** - Client-side language switching
   - Uses translation API for on-demand translation fetching
   - Implements progressive enhancement (API → AJAX → page reload)

3. **`i18n-header-widgets`** - Example multilingual widget
   - Uses `multilingual-string` field type
   - Demonstrates template filter integration

4. **`apostrophe-i18n-deepl`** - DeepL integration foundation
   - Placeholder module for automated translation
   - Requires `DEEPL_API_KEY` environment variable

## API Reference

### Translation Fetching Endpoint

**GET `/modules/apostrophe-i18n-content/translations`**

Fetches translations for specific IDs in the requested locale.

**Parameters:**
- `ids` (array): Translation IDs to fetch (e.g., `ids[]=t-abc123&ids[]=t-def456`)
- `locale` (string): Target locale code (defaults to current request locale)

**Response:**
```json
{
  "status": "ok",
  "translations": {
    "t-abc123": "Translated text in requested locale",
    "t-def456": "Another translated text"
  }
}
```

**Client-side Usage:**
```javascript
apos.utils.get('/modules/apostrophe-i18n-content/translations', {
  ids: ['t-abc123', 't-def456'],
  locale: 'de'
}, function(err, result) {
  if (err) {
    console.warn('Translation API failed:', err);
    return;
  }
  
  // Update DOM elements with result.translations
  Object.keys(result.translations).forEach(function(id) {
    var element = document.querySelector('[data-translation-id="' + id + '"]');
    if (element) {
      element.textContent = result.translations[id];
    }
  });
});
```

### Batch Translation Endpoint (DeepL Ready)

**POST `/modules/apostrophe-i18n-content/translate-batch`**

Placeholder endpoint for DeepL integration. Requires authentication.

**Request Body:**
```json
{
  "ids": ["t-abc123", "t-def456"],
  "sourceLocale": "en",
  "targetLocale": "de"
}
```

**Response:**
```json
{
  "status": "ok",
  "message": "Translation endpoint ready for DeepL integration",
  "translations": {}
}
```

## Template Integration

### Template Filters

1. **`i18n` filter**: Get translation for current locale
   ```html
   <h1>{{ data.widget.title | i18n }}</h1>
   ```

2. **`i18nMeta` filter**: Sanitized translation for meta tags
   ```html
   <meta name="description" content="{{ data.page.seoDescription | i18nMeta }}">
   ```

3. **`translationsAttribute` filter**: Generates `data-translation-id` attribute
   ```html
   <div {{ data.widget.content | translationsAttribute }}>
     {{ data.widget.content | i18n }}
   </div>
   ```

### Translation ID Generation

Translation IDs are deterministic content-based hashes:
```javascript
// Generation logic:
var contentHash = JSON.stringify(translations);
var id = 't-' + require('crypto').createHash('md5')
  .update(contentHash)
  .digest('hex')
  .substring(0, 8);
```

This ensures:
- **Consistency**: Same content generates same ID across requests
- **Cacheability**: IDs can be cached effectively
- **No collisions**: Extremely low probability of hash collisions

## Configuration

### Minimal Configuration (data/local.js)
```javascript
// data/local.js - Minimal configuration
'apostrophe-i18n': {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  cookie: 'material-cms.locale',
  updateFiles: true
},
'apostrophe-i18n-content': {
  // No additional configuration required
  // API-first architecture always uses secure delivery
}
```

### DeepL Configuration
```javascript
// In app.js modules configuration
'apostrophe-i18n-deepl': {
  apiKey: process.env.DEEPL_API_KEY
}
```

**Environment Variable:**
```bash
DEEPL_API_KEY=your-deepl-api-key
```

## Language Switcher Implementation

### Client-Side Logic (language-switcher-widgets/public/js/widget.js)
```javascript
function switchLocale(locale) {
  // 1. Set locale cookie
  document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000';
  
  // 2. Fetch translations via API
  updateTranslationsViaAPI(locale).then(function(result) {
    if (result.updated > 0) {
      // Success: translations updated via API
      return;
    }
    
    // 3. Fallback to AJAX navigation if API returns no translations
    if (apos.utils.ajaxGo) {
      var url = window.location.pathname + window.location.search;
      url = url.replace(/[?&]locale=[^&]*/, '');
      var separator = url.includes('?') ? '&' : '?';
      var targetUrl = url + separator + 'locale=' + locale;
      apos.utils.ajaxGo('page', targetUrl);
    } else {
      // 4. Final fallback: page reload
      window.location.reload();
    }
  });
}
```

### Progressive Enhancement
1. **API first**: Try to fetch translations via REST API
2. **AJAX fallback**: If API fails, use Apostrophe's AJAX navigation
3. **Page reload**: As final fallback (rarely needed)

## Security Considerations

### Authentication & Authorization
1. **Public translations**: The `translations` endpoint is publicly accessible
2. **Admin translations**: The `translate-batch` endpoint requires authentication
3. **API rate limiting**: Consider implementing rate limiting for translation endpoints

### Content Security
1. **No HTML exposure**: Translations never exposed in page source
2. **Sanitized output**: `i18nMeta` filter removes HTML tags for meta content
3. **XSS protection**: Apostrophe's template system provides automatic escaping

## Performance Considerations

### Caching Strategy
1. **Browser caching**: API responses can be cached with appropriate headers
2. **CDN caching**: Translation endpoints can be cached at CDN level
3. **Server-side caching**: Consider Redis caching for frequently requested translations

### Bundle Size Impact
**Before**: Translations-map added variable KB to every page
**After**: Zero translation data in initial HTML, ~1 KB JavaScript for API client

### Debugging Tools
1. **API testing**:
   ```bash
   http GET "http://localhost:3000/modules/apostrophe-i18n-content/translations?ids[]=t-abc123&locale=de"
   ```

2. **Client-side debugging**:
   ```javascript
   // Check for translation elements
   console.log(document.querySelectorAll('[data-translation-id]').length);
   
   // Check API response
   apos.utils.get('/modules/apostrophe-i18n-content/translations', {
     ids: ['t-abc123'],
     locale: 'de'
   }, function(err, result) {
     console.log('API response:', err, result);
   });
   ```

## See Also

- [Apostrophe Lean Frontend Assets](lean_frontend_assets.md)
- [AJAX Utilities](ajax_utils.md)
- [Custom Schema Field Types](custom_shema_field_type.md)