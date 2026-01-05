var _ = require('lodash');

module.exports = {
  // We'll extend apostrophe-i18n to inherit locale configuration
  extend: 'apostrophe-i18n',
  name: 'apostrophe-i18n-content',
  label: 'Multilingual Content',

  afterConstruct: function(self) {
    self.addFieldType();
    self.pushAssets();
    self.pushCreateSingleton();
    self.addTemplateFilter();
  },

  construct: function(self, options) {
    // Get locale configuration from parent module
    var locales = self.options.locales || ['en'];
    var defaultLocale = locales[0];

    // Store for use in filter
    self.locales = locales;
    self.defaultLocale = defaultLocale;

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
    // 4. TEMPLATE FILTER FOR FRONTEND RENDERING
    // -------------------------------------------------------------
    self.addTemplateFilter = function() {
      self.apos.templates.addFilter('i18n', self.i18nFilter);
    };

    self.i18nFilter = function(value, locale) {
      if (!value) return '';
      
      var req = self.apos.templates.contextReq;
      var targetLocale = locale || (req && req.data && req.data.locale) || self.defaultLocale;
      
      // Plain string (non-multilingual) -> return as-is
      if (typeof value === 'string') {
        return value;
      }
      
      // Object with _translations property
      if (value._translations && typeof value._translations === 'object') {
        return value._translations[targetLocale] ||
               value._translations[self.defaultLocale] ||
               '';
      }
      
      // Object with locale keys directly
      if (typeof value === 'object' && value[targetLocale]) {
        return value[targetLocale];
      }
      
      return String(value);
    };

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