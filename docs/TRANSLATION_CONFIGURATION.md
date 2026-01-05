# TRANSLATION PRIVACY CONFIGURATION
## Configurable Translation Exposure for Debugging vs Production

## OVERVIEW

The multilingual system now supports **configurable translation privacy** with three modes:

1. **Debug Mode** (default): Translations exposed as plain JSON in HTML
2. **Privacy Mode**: Translations Base64 encoded in HTML  
3. **Production Mode**: Translations not exposed in HTML (requires page reload)

## CONFIGURATION OPTIONS

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

## MODES EXPLAINED

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
The `translation-utils.js` automatically:
1. Detects if translations are exposed
2. Parses JSON or Base64 as needed
3. Falls back to page reload if translations not exposed

### **Language Switcher Integration**
The language switcher widget uses `apos.utils.translationUtils.switchLocale()` which handles all modes automatically.

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
1. `exposeTranslations` is likely `false`
2. Check configuration is loaded correctly
3. Verify `translation-utils.js` is included

## API REFERENCE

### **Template Filters**
- `i18n`: Get translation for current locale
- `translationsAttribute`: Generate `data-translations` attribute (respects config)

### **JavaScript API**
```javascript
// Check current configuration
apos.utils.translationUtils.config.exposeTranslations
apos.utils.translationUtils.config.base64Encode

// Switch language (handles all modes)
apos.utils.translationUtils.switchLocale('de')

// Check if translations are exposed
apos.utils.translationUtils.areTranslationsExposed()
```