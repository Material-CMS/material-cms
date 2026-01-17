# DeepL Auto‑Translate for Piece Editors

## Problem

DeepL auto‑translate worked for widget editors but not for piece editors with `multilingual‑string` fields. The widget editor template (`baseWidgetEditor.html`) adds a button with both `data‑deepl‑translate` and `data‑apos‑deepl‑translate` attributes, and the JavaScript click handler (`widget‑editor.js`) listens for `[data‑apos‑deepl‑translate]`.

The piece editor modal uses a different template pattern: it extends `editorBase.html` and renders its controls via the `editControls()` macro. The original `edit.html` template’s `extraControls` block was not being rendered because the modal does not use that block.

## Solution

Instead of trying to extend the piece editor modal’s JavaScript (which caused a moog recursion error), we overrode the template directly.

### 1. Override `editorBase.html`

Create a project‑level copy of `editorBase.html` in `lib/modules/apostrophe‑pieces/views/`. The template must **not** extend itself (no `extends "apostrophe‑pieces:views/editorBase.html"`), because that would create a circular reference. Instead, extend the same parent as the original (`apostrophe‑modal:baseSlideable.html`) and copy the entire original content, then add the DeepL buttons.

### 2. Add plain button elements

The widget editor uses a plain `<button>` element, not the `buttons.minor` macro, because the macro adds an `action` attribute that conflicts with the required `data‑apos‑deepl‑translate` attribute. We followed the same pattern:

```django
<button type="button"
        class="apos-button apos-button--minor deepl-translate-button"
        data-deepl-translate="{{ field.name }}"
        data-apos-deepl-translate="{{ field.name }}">
  <span class="apos-button-label">
    <i class="fa fa-translate"></i>
    Auto Translate
  </span>
</button>
```

### 3. No JavaScript extension needed

The existing `widget‑editor.js` script already delegates clicks to `[data‑apos‑deepl‑translate]` anywhere in the document, so the button works immediately. The script reads `modal.options.defaultLocale`; if that property is not set, it falls back to `'en'`, which is acceptable for the project’s i18n configuration.

### 4. Clean up

- Remove any debug code left in `edit.html` (the `extraControls` block is not used).
- Do not create a separate `editor‑modal.js` extension; it is unnecessary and can cause infinite recursion.

## Verification

- The “Auto Translate” button appears in the piece editor modal next to the standard controls.
- Clicking the button triggers a DeepL API request and fills empty target‑locale inputs.
- No JavaScript errors or server‑side errors occur.

## Key Insights

- **Template overrides must avoid self‑reference.** When placing a file in the same module with the same name, do not extend the same module‑relative path.
- **Use plain HTML for custom attributes.** The `buttons.minor` macro automatically adds an `action` attribute that can interfere with custom `data‑*` attributes.
- **Leverage existing JavaScript.** The widget‑editor script is already loaded for logged‑in users and works for any modal that contains the correct attributes.
- **Avoid moog recursion.** Extending a modal’s JavaScript definition (`apostrophe‑pieces‑editor‑modal`) can lead to infinite loops if the extension is not carefully structured. In this case, a template‑only solution was simpler and more robust.

## Files Changed

- `lib/modules/apostrophe‑pieces/views/editorBase.html` – added DeepL buttons.
- `lib/modules/apostrophe‑pieces/views/edit.html` – reverted to a simple extend (no functional change).

No changes were required in `apostrophe‑i18n‑deepl` module or any JavaScript files.