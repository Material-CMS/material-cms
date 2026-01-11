# Internationalization (i18n) System

## Overview

Two‑layer system:
1. **Static text** – `apostrophe‑i18n` (file‑based JSON).
2. **User‑generated content** – `multilingual‑string` custom field type.

Progressive enhancement:
- **Debug mode** (`exposeTranslations: true`) – Translations exposed in HTML for instant AJAX switching.
- **Production mode** (`exposeTranslations: false`) – Translations hidden; page reload required.

## Configuration

### Locale Setup (`apostrophe‑i18n`)
```javascript
// app.js
modules: {
  'apostrophe-i18n': {
    locales: ['en', 'de', 'fr'],
    defaultLocale: 'en',
    updateFiles: false
  }
}
```

### Translation Privacy (`apostrophe‑i18n‑content`)
```javascript
// data/local.js
'apostrophe-i18n-content': {
  exposeTranslations: true,   // false in production
  cookieName: 'material-cms.locale'
}
```

## Custom Field Type: `multilingual‑string`

### Schema Definition
```javascript
addFields: [
  {
    name: 'title',
    type: 'multilingual‑string',
    label: 'Title',
    textarea: false   // optional
  }
]
```

**Properties**: `type`, `textarea` (boolean). All standard schema properties supported.

### Admin UI
One input per locale; default locale marked “DEFAULT”.

## Template Filters

### `i18n`
Returns translation for current locale. If the translation is stored as an object with a `text` property (for future extensibility), the `text` property is used.
```html
<h2>{{ data.widget.title | i18n }}</h2>
```

### `i18nMeta`
Sanitized version for meta tags (strips HTML). Also handles object translations.
```html
<meta name="description" content="{{ data.piece.description | i18nMeta }}">
```

### `translationsAttribute`
Generates `data‑translation‑id` attribute only when `exposeTranslations: true`.
```html
<div {{ data.widget.title | translationsAttribute }}>
  {{ data.widget.title | i18n }}
</div>
```

## Newline Handling

Multilingual textarea fields store newline characters (`\n`) in the translation data. To preserve line breaks in frontend rendering, apply CSS `white‑space: pre‑line` to the containing element.

**Example** (header widget):
```html
<h2 style="white‑space: pre‑line;" {{ data.widget.header | translationsAttribute }}>
  {{ data.widget.header | i18n }}
</h2>
```

Alternatively, add a CSS class:
```css
.preserve-newlines {
  white-space: pre-line;
}
```

The language switcher widget updates `textContent`, which respects newlines; the same CSS rule ensures they are displayed as line breaks.

## Extensible Translation Objects

The `multilingual‑string` field type supports storing translation values as either strings or objects. This allows future extensions (e.g., auto‑translation metadata) without breaking existing templates.

**Object format** (optional):
```javascript
{
  translations: {
    en: { text: "Hello", source: "de", provider: "deepl" },
    de: { text: "Hallo", source: "en", provider: "manual" }
  }
}
```

The `i18n` and `i18nMeta` filters automatically extract the `text` property when present. If the value is a plain string, it is used as‑is.

This design ensures backward compatibility while enabling advanced features like translation provenance, confidence scores, and automated translation pipelines.

## Centralized Translation Map

When `exposeTranslations: true`, a JSON map is injected:
```html
<script id="translations-map" type="application/json">
  { "translation‑1": { "en": "Hello", "de": "Hallo" } }
</script>
```

Enables client‑side translation updates without server round‑trip.

## Language Switcher Widget

### Progressive Enhancement
1. Update from central map.
2. Fallback to AJAX navigation (`apos.utils.ajaxGo`).
3. Fallback to page reload.

### Widget Usage
```javascript
{{ apos.singleton(data.page, 'languageSwitcher', 'language‑switcher') }}
```

## Meta Tags & Page Title

Partial `views/meta‑tags.html` replaces `apostrophe‑seo` and `apostrophe‑open‑graph`. Uses `i18nMeta` filter for translation and `translationsAttribute` filter to attach `data‑translation‑id` attributes when `exposeTranslations: true`.

**AJAX‑based updates**: When `exposeTranslations: true`, the language switcher can update SEO and Open Graph meta tags (title, description) without page reload. The translation map includes meta tag translations, and the language switcher updates the `content` attribute of `<meta>` elements automatically.

**Page Title (`<title>` element)**: The page title (shown in browser tab) is derived from the `seoTitle` multilingual field (or falls back to `page.title`). When `exposeTranslations: true`, the language switcher automatically updates the page title using the same translation as the SEO title meta tag, ensuring the browser tab reflects the selected language instantly.

**Limitations**:
- `og:locale` and `og:locale:alternate` are not multilingual fields; they reflect the current request locale and are not updated via AJAX.
- Meta tags that reference images or canonical URLs remain unchanged (they are not multilingual).
- If `seoTitle` is empty, the page title falls back to `page.title` (non‑multilingual) and will not be updated.

**Production SEO**: If you require meta tags and page title to always reflect the correct locale for search engine crawlers, set `exposeTranslations: false` to force page reloads.

## AJAX Integration

`ajax‑utils.js` automatically preserves locale parameter across AJAX navigation by reading the `material‑cms.locale` cookie and appending `?locale=xx` to URLs.

## Troubleshooting

### Page Reloads Instead of Instant Switching
- `exposeTranslations` is `false`.
- Missing `data‑apos‑ajax‑context="page"` wrapper.
- `ajax‑utils.js` not loaded.

### Translations Not Updating
- Missing `translations‑map` script.
- `data‑translation‑id` attributes not generated (check `translationsAttribute` filter).
- Cookie not set.

### Field Data Empty (`{}`) in HTML
Ensure field stores data in property **without** leading underscore (`translations`, not `_translations`). See [Custom Schema Field Types](custom_shema_field_type.md).

### Meta Tags Not Changing After AJAX Switch
- Ensure `exposeTranslations: true` (debug mode) and that meta tags have `data‑translation‑id` attributes (automatically added by the `translationsAttribute` filter).
- Verify the translation map includes entries for the meta tags (check the `translations‑map` script in page source).
- If `exposeTranslations: false`, meta tags will not be updated via AJAX; page reload is required.

## API Reference

### Module: `apostrophe‑i18n‑content`
- Extends `apostrophe‑i18n`.
- Configuration: `exposeTranslations`, `cookieName`.
- Adds field type `multilingual‑string`.
- Adds filters: `i18n`, `i18nMeta`, `translationsAttribute`.
- Injects `translations‑map` and `i18nConfig`.

### Template Filters
| Filter | Purpose |
|--------|---------|
| `i18n` | Translation for current locale |
| `i18nMeta` | Sanitized translation for meta tags |
| `translationsAttribute` | `data‑translation‑id` attribute (if exposed) |

## See Also

- [AJAX Utilities](ajax_utils.md)
- [Lean Frontend Assets](lean_frontend_assets.md)
- [Custom Schema Field Types](custom_shema_field_type.md)
- [Apostrophe i18n Docs](docs/apostrophe‑v2‑docs/advanced‑topics/apostrophe‑i18n‑config.md)

---

**Version**: 2.2.0
**Last Updated**: 2025‑01‑16
**Compatibility**: ApostropheCMS v2.227.11+ with `lean: true`