var _ = require('lodash');

module.exports = {
  // We'll extend apostrophe-i18n to inherit locale configuration
  extend: 'apostrophe-i18n',
  name: 'apostrophe-i18n-content',
  label: 'Multilingual Content',

  afterConstruct: function(self) {
    self.addMiddleware();
    self.addFieldType();
    self.pushAssets();
    self.pushCreateSingleton();
    self.addTemplateFilter();
  },

  construct: function(self, options) {
    // Get locale configuration from parent module
    var locales = self.options.locales || ['en'];
    var defaultLocale = locales[0];
    
    // Configuration for translation privacy
    self.exposeTranslations = self.options.exposeTranslations !== false; // Default: true (expose for debugging)
    self.base64Encode = self.options.base64Encode || false; // Default: false (plain JSON)

    // Store for use in filter
    self.locales = locales;
    self.defaultLocale = defaultLocale;
    self.exposeTranslations = self.exposeTranslations;
    self.base64Encode = self.base64Encode;

    // -------------------------------------------------------------
    // 0. LOCALE DETECTION MIDDLEWARE & CONFIG INJECTION
    // -------------------------------------------------------------
    self.addMiddleware = function() {
      self.apos.app.use(function(req, res, next) {
        // Determine locale from cookie, Accept-Language header, or default
        var cookieLocale = req.cookies ? req.cookies['material-cms.locale'] : null;
        var acceptLanguage = req.headers['accept-language'];
        var detectedLocale = null;

        // Priority 1: cookie (user's explicit choice)
        if (cookieLocale && locales.indexOf(cookieLocale) !== -1) {
          detectedLocale = cookieLocale;
        }
        // Priority 2: Accept-Language header (browser preference)
        else if (acceptLanguage) {
          // Parse Accept-Language header (simple parsing)
          var languages = acceptLanguage.split(',');
          for (var i = 0; i < languages.length; i++) {
            var lang = languages[i].split(';')[0].trim().toLowerCase();
            // Check if locale matches exactly (e.g., 'en') or prefix (e.g., 'en-us' -> 'en')
            var match = locales.find(function(locale) {
              return lang === locale.toLowerCase() || lang.startsWith(locale.toLowerCase() + '-');
            });
            if (match) {
              detectedLocale = match;
              break;
            }
          }
        }
        // Priority 3: default locale
        if (!detectedLocale) {
          detectedLocale = defaultLocale;
        }

        // Set locale on request data for template filters
        if (!req.data) {
          req.data = {};
        }
        req.data.locale = detectedLocale;

        // Also set res.locals for direct template access
        res.locals.locale = detectedLocale;
        res.locals.locales = locales;
        res.locals.defaultLocale = defaultLocale;
        
        // Inject i18n configuration for frontend
        res.locals.i18nConfig = {
          exposeTranslations: self.exposeTranslations,
          base64Encode: self.base64Encode,
          locales: locales,
          defaultLocale: defaultLocale
        };

        next();
      });
    };

    // -------------------------------------------------------------
    // 1. CUSTOM FIELD TYPE REGISTRATION
    // -------------------------------------------------------------
    self.addFieldType = function() {
      self.apos.schemas.addFieldType({
        name: 'multilingual-string',
        converters: {
          // CSV converter handles both CSV import and form submission
          csv: function(req, data, name, object, field, callback) {
            try {
              var value = data[name];
              var translations = {};
              
              // Parse JSON or use object directly
              if (typeof value === 'string' && value.trim() !== '') {
                try {
                  value = JSON.parse(value);
                } catch (e) {
                  // Keep as string
                }
              }
              
              // Normalize to translations object
              if (value && typeof value === 'object') {
                translations = value.translations || value._translations || value;
              } else {
                translations[defaultLocale] = value || '';
              }
              
              // Ensure all locales exist
              _.each(locales, function(locale) {
                if (!translations[locale]) {
                  translations[locale] = '';
                }
              });
              
              object[name] = { translations: translations };
              return setImmediate(callback);
            } catch (e) {
              return setImmediate(callback, e);
            }
          },
          // Use same converter for forms
          form: 'csv'
        },
        partial: self.fieldTypePartial,
        getDefault: self.getDefault
      });
    };

    // -------------------------------------------------------------
    // 2. NUNJUCKS PARTIAL FOR ADMIN UI
    // -------------------------------------------------------------
    self.fieldTypePartial = function(data) {
      // Augment field definition with locales for template
      data.locales = locales;
      data.defaultLocale = defaultLocale;
      return self.partial('field', data);
    };

    // Default value for new fields
    self.getDefault = function() {
      var translations = {};
      _.each(locales, function(locale) {
        translations[locale] = '';
      });
      return { translations: translations };
    };

    // -------------------------------------------------------------
    // 3. ASSETS (JavaScript and CSS for admin UI)
    // -------------------------------------------------------------
    self.pushAssets = function() {
      self.pushAsset('script', 'user', { when: 'user' });
      self.pushAsset('stylesheet', 'user', { when: 'user' });
    };

    // -------------------------------------------------------------
    // 4. TEMPLATE FILTERS FOR FRONTEND RENDERING
    // -------------------------------------------------------------
    self.addTemplateFilter = function() {
      self.apos.templates.addFilter('i18n', self.i18nFilter);
      self.apos.templates.addFilter('translationsAttribute', self.translationsAttributeFilter);
    };

    self.i18nFilter = function(value, locale) {
      if (!value) return '';
      
      var req = self.apos.templates.contextReq;
      var targetLocale = locale || (req && req.data && req.data.locale) || self.defaultLocale;
      
      // Plain string (non-multilingual) -> return as-is
      if (typeof value === 'string') {
        return value;
      }
      
      // Get translations property
      var translations = value.translations;
      
      if (translations && typeof translations === 'object') {
        var translation = translations[targetLocale] ||
               translations[self.defaultLocale] ||
               '';
        return translation;
      }
      
      // Object with locale keys directly
      if (typeof value === 'object' && value[targetLocale]) {
        return value[targetLocale];
      }
      
      return String(value);
    };
    
    // Filter to generate translations attribute for widgets
    self.translationsAttributeFilter = function(value) {
      if (!value || !value.translations || typeof value.translations !== 'object') {
        return self.apos.templates.safe('');
      }
      
      var translations = value.translations;
      
      // If not exposing translations, return empty string
      if (!self.exposeTranslations) {
        return self.apos.templates.safe('');
      }
      
      // Convert to JSON string
      var json = JSON.stringify(translations);
      
      // Apply Base64 encoding if configured
      if (self.base64Encode) {
        try {
          json = Buffer.from(json).toString('base64');
        } catch (e) {
          // Fallback to plain JSON if encoding fails
          console.warn('Base64 encoding failed, using plain JSON:', e);
        }
      }
      
      // Return as safe HTML (not escaped by Nunjucks)
      return self.apos.templates.safe('data-translations="' + self.apos.utils.escapeHtml(json) + '"');
    };

    // -------------------------------------------------------------
    // 5. BROWSER-SIDE CONFIGURATION
    // -------------------------------------------------------------
    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions ? superGetCreateSingletonOptions(req) : {};
      options.locales = locales;
      options.defaultLocale = defaultLocale;
      options.exposeTranslations = self.exposeTranslations;
      options.base64Encode = self.base64Encode;
      return options;
    };
  }
};