# Markdown Template Filters

The `apostrophe-markdown` module provides template filters for converting markdown to HTML using the [marked](https://marked.js.org/) library, which supports CommonMark and GitHub Flavored Markdown (GFM). Output is automatically sanitized using `sanitize-html` for security.

## Markdown Support

The module uses `marked` (v17.0.1) which provides support for standard markdown syntax:

- Headings (`#`, `##`, etc.)
- Lists (ordered and unordered)
- Blockquotes (`>`)
- Code blocks (inline and fenced)
- Horizontal rules (`---`)
- Links and images
- **Strong** and *emphasis*
- Strikethrough (`~~text~~`)
- Tables (GFM)
- Task lists (GFM)

For full syntax reference, see the [marked documentation](https://marked.js.org/).

## Available Filters

### `markdown`
Converts markdown text to HTML with automatic sanitization for security.

```html
{{ "**bold** text" | markdown }}
```
Output: `<p><strong>bold</strong> text</p>`

Options:
- `sanitize` (boolean): If `false`, disables HTML sanitization (default: `true`)
- `plainText` (boolean): If `true`, removes markdown formatting and returns plain text (default: `false`)

Example with disabled sanitization (only for trusted content):
```html
{{ trustedContent | markdown({ sanitize: false }) }}
```

### `i18nMarkdown`
Combines i18n translation with markdown conversion. Requires `apostrophe-i18n-content` module.

```html
{{ multilingualField | i18nMarkdown }}
```
This first selects the appropriate translation based on current locale, then converts markdown to HTML (with sanitization by default).

You can specify a locale:
```html
{{ multilingualField | i18nMarkdown("de") }}
```

## Usage with i18n System

When using multilingual strings (`multilingual-string` field type), you can chain filters:

```html
{{ data.widget.text | i18n | markdown }}
```

Or use the combined filter:
```html
{{ data.widget.text | i18nMarkdown }}
```

## Security Considerations

- The `markdown` filter sanitizes HTML by default using `sanitize-html`
- Sanitization removes dangerous elements and attributes (scripts, event handlers, etc.)
- Only disable sanitization (`sanitize: false`) for content you fully trust (admin-edited)
- Note: `marked` does not sanitize HTML by default; our module adds this security layer

## Examples

```html
{# Basic markdown with automatic sanitization #}
<div class="content">
  {{ piece.description | markdown }}
</div>

{# Multilingual content with markdown #}
<h2>{{ data.widget.title | i18nMarkdown }}</h2>

{# Disable sanitization for trusted admin content #}
<div class="admin-content">
  {{ trustedAdminContent | markdown({ sanitize: false }) }}
</div>

{# Plain text extraction (no HTML) #}
<meta name="description" content="{{ piece.body | markdown({ plainText: true }) }}">
```