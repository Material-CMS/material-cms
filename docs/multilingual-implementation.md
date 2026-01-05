# Multilingual Content Implementation Blueprint

## Architecture Overview

**Goal**: Enable multilingual string fields in ApostropheCMS v2 using existing schema patterns.

**Core Principle**: Create a custom field type `multilingual-string` that stores translations as an object with locale keys.

**Pattern**: Follow the exact same pattern as the `color-picker` example from Apostrophe documentation.

## 1. Module Structure

### File: `lib/modules/apostrophe-i18n-content/index.js`

```javascript
var _ = require('lodash');

module.exports = {
  // Extend apostrophe-i18n to inherit locale configuration
  extend: 'apostrophe-i18n',
  name: 'apostrophe-i18n-content',
  label: 'Multilingual Content',

  afterConstruct: function(self) {
    self.addFieldType();
    self.pushAssets();
    self.pushCreateSingleton();
  },

  construct: function(self, options) {
    // Get locale configuration from parent module
    var locales = self.options.locales || ['en'];
    var defaultLocale = locales[0];

    // -------------------------------------------------------------
    // 1. CUSTOM FIELD TYPE REGISTRATION
    // -------------------------------------------------------------
    self.addFieldType = function() {
      self.apos.schemas.addFieldType({
        name: 'multilingual-string',
        converters: {
          // CSV converter handles both CSV import and form submission
          csv: function(req, data, name, object, field, callback) {
            var value = data[name];
            var result = {};
            
            // If value is already an object with _translations, use it
            if (value && typeof value === 'object' && value._translations) {
              result = value;
            } else if (value && typeof value === 'object') {
              // Assume it's already in translation format
              result._translations = value;
            } else {
              // Single string value -> store in default locale
              result._translations = {};
              result._translations[defaultLocale] = value || '';
            }
            
            // Ensure all configured locales have at least empty string
            _.each(locales, function(locale) {
              if (!result._translations[locale]) {
                result._translations[locale] = '';
              }
            });
            
            object[name] = result;
            return setImmediate(callback);
          },
          // Use same converter for forms
          form: 'csv'
        },
        partial: self.fieldTypePartial
      });
    };

    // -------------------------------------------------------------
    // 2. NUNJUCKS PARTIAL FOR ADMIN UI
    // -------------------------------------------------------------
    self.fieldTypePartial = function(data) {
      return self.partial('field', data);
    };

    // -------------------------------------------------------------
    // 3. ASSETS (JavaScript and CSS for admin UI)
    // -------------------------------------------------------------
    self.pushAssets = function() {
      self.pushAsset('script', 'user', { when: 'user' });
      self.pushAsset('stylesheet', 'user', { when: 'user' });
    };

    // -------------------------------------------------------------
    // 4. TEMPLATE HELPER FOR FRONTEND RENDERING
    // -------------------------------------------------------------
    self.addHelpers({
      i18n: function(value, locale) {
        if (!value) return '';
        
        var req = self.apos.templates.contextReq;
        var targetLocale = locale || (req && req.data && req.data.locale) || defaultLocale;
        
        // Plain string (non-multilingual) -> return as-is
        if (typeof value === 'string') {
          return value;
        }
        
        // Object with _translations property
        if (value._translations && typeof value._translations === 'object') {
          return value._translations[targetLocale] || 
                 value._translations[defaultLocale] || 
                 '';
        }
        
        // Object with locale keys directly
        if (typeof value === 'object' && value[targetLocale]) {
          return value[targetLocale];
        }
        
        return String(value);
      }
    });

    // -------------------------------------------------------------
    // 5. BROWSER-SIDE CONFIGURATION
    // -------------------------------------------------------------
    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions ? superGetCreateSingletonOptions(req) : {};
      options.locales = locales;
      options.defaultLocale = defaultLocale;
      return options;
    };
  }
};
```

### File: `lib/modules/apostrophe-i18n-content/views/field.html`

```nunjucks
{# Based on color-picker pattern #}
{%- import "apostrophe-schemas:macros.html" as schemas -%}

{# Macro for multilingual string field content #}
{% macro multilingualString(field) %}
  <div class="apos-multilingual-string" data-multilingual-string>
    {% for locale in data.locales %}
      <div class="apos-multilingual-locale{% if locale === data.defaultLocale %} apos-multilingual-default{% endif %}" data-locale="{{ locale }}">
        <label class="apos-multilingual-label">
          {{ locale|upper }}:
          <input 
            type="text" 
            class="apos-multilingual-input" 
            data-locale-input="{{ locale }}"
            placeholder="Translation for {{ locale }}"
          />
        </label>
      </div>
    {% endfor %}
  </div>
{% endmacro %}

{# Wrap in standard fieldset #}
{{ schemas.fieldset(data, multilingualString) }}
```

### File: `lib/modules/apostrophe-i18n-content/public/js/user.js`

```javascript
apos.define('apostrophe-i18n-content', {
  extend: 'apostrophe-module',
  construct: function(self, options) {
    self.locales = options.locales || ['en'];
    self.defaultLocale = options.defaultLocale || 'en';
    
    self.afterInit = function() {
      // Initialize multilingual string fields
      apos.on('enhance', function($el) {
        $el.find('[data-multilingual-string]').each(function() {
          self.enhanceMultilingualField($(this));
        });
      });
    };
    
    self.enhanceMultilingualField = function($field) {
      var $inputs = $field.find('[data-locale-input]');
      var fieldName = $field.closest('[data-field]').attr('data-field-name');
      
      // Load existing value
      var currentValue = apos.schemas.getField($field, fieldName);
      if (currentValue && currentValue._translations) {
        _.each(currentValue._translations, function(text, locale) {
          $field.find('[data-locale-input="' + locale + '"]').val(text);
        });
      }
      
      // Update on input
      $inputs.on('input', function() {
        var translations = {};
        $inputs.each(function() {
          var locale = $(this).attr('data-locale-input');
          translations[locale] = $(this).val();
        });
        apos.schemas.setField($field, fieldName, {
          _translations: translations
        });
      });
    };
  }
});
```

## 2. Configuration Updates

### File: `data/local.js`

```javascript
// Add to existing modules configuration
'apostrophe-i18n': {
  locales: {
    en: {
      label: 'English',
      default: true
    },
    de: {
      label: 'German'
    },
    fr: {
      label: 'French'
    }
  }
},
'apostrophe-i18n-content': {}
```

## 3. Widget Migration Pattern

### File: `lib/modules/header-widgets/index.js` (Example)

```javascript
module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Header',
  addFields: [
    {
      name: 'header',
      type: 'multilingual-string',  // Changed from 'string'
      label: 'Header Text',
      required: true
    },
    // ... other fields unchanged
  ]
};
```

## 4. Template Updates

### File: `lib/modules/header-widgets/views/widget.html`

```nunjucks
{# Before: #}
{{ data.widget.header }}

{# After: #}
{{ data.widget.header | i18n }}
```

## 5. Database Migration Strategy

**Option A**: Progressive migration (recommended)
- New fields use `multilingual-string` type
- Existing fields remain as strings (backward compatible)
- Template uses `| i18n` filter which handles both formats

**Option B**: Bulk migration script
- Convert all `string` fields to `multilingual-string`
- Move existing value to `_translations.en`

## 6. API Extensions

### Server-side Helper Methods:

```javascript
// In apostrophe-i18n-content module
self.methods = {
  getTranslation: function(value, locale) {
    // Same logic as template filter
  },
  
  getAllTranslations: function(value) {
    // Return all translations as object
  }
};
```

## 7. Testing Protocol

1. **Admin UI Test**:
   - Create header widget with multilingual field
   - Verify locale tabs appear
   - Enter translations for each locale
   - Save and verify storage format

2. **Frontend Test**:
   - Render widget with `| i18n` filter
   - Verify correct locale displays
   - Test locale switching via cookie/URL

3. **Backward Compatibility**:
   - Existing string fields still render
   - `| i18n` filter handles plain strings

## 8. Performance Considerations

- Translation objects stored inline with document (no joins)
- No additional database queries
- Browser-side JavaScript minimal (one-time enhancement)
- Template filter is synchronous and fast

## 9. Extension Points

**Future enhancements**:
- Locale fallback chains (en-US → en → default)
- Translation memory/import
- Machine translation integration
- Translation workflow (draft/published)

## 10. Implementation Checklist

- [ ] Create `apostrophe-i18n-content` module
- [ ] Implement custom field type with converters
- [ ] Create Nunjucks partial for admin UI
- [ ] Write browser-side JavaScript
- [ ] Add template helper `i18n`
- [ ] Configure locales in `data/local.js`
- [ ] Update prototype widget (header-widgets)
- [ ] Test admin interface
- [ ] Test frontend rendering
- [ ] Document usage for other widgets

---

**Architect's Note**: This implementation follows Apostrophe v2 patterns exactly, reusing the proven `color-picker` approach. It adds minimal abstraction (1 custom field type, 1 template filter) while solving the multilingual content problem comprehensively.