var _ = require('lodash');

module.exports = {
  // We'll extend apostrophe-i18n to inherit locale configuration
  extend: 'apostrophe-i18n',
  name: 'apostrophe-i18n-content',
  label: 'Multilingual Content',

  afterConstruct: function(self) {
    console.log('apostrophe-i18n-content: afterConstruct');
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

    // Store for use in filter
    self.locales = locales;
    self.defaultLocale = defaultLocale;

    // -------------------------------------------------------------
    // 0. LOCALE DETECTION MIDDLEWARE
    // -------------------------------------------------------------
    self.addMiddleware = function() {
      console.log('apostrophe-i18n-content: Adding locale detection middleware');
      self.apos.app.use(function(req, res, next) {
        console.log('apostrophe-i18n-content: middleware executing for', req.url);
        console.log('apostrophe-i18n-content: req.cookies', req.cookies);
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

        console.log('apostrophe-i18n-content: detected locale', detectedLocale, 'cookie:', cookieLocale, 'accept-language:', acceptLanguage);
        next();
      });
    };

    // -------------------------------------------------------------
    // 1. CUSTOM FIELD TYPE REGISTRATION
    // -------------------------------------------------------------
    self.addFieldType = function() {
      console.log('apostrophe-i18n-content: Registering field type multilingual-string');
      self.apos.schemas.addFieldType({
        name: 'multilingual-string',
        converters: {
          // CSV converter handles both CSV import and form submission
          csv: function(req, data, name, object, field, callback) {
            console.log('apostrophe-i18n-content: csv converter called', name, 'value:', data[name]);
            try {
              var value = data[name];
              var result = {};
              
              // Parse JSON string if present (form submission from hidden input)
              if (typeof value === 'string' && value.trim() !== '') {
                try {
                  value = JSON.parse(value);
                  console.log('apostrophe-i18n-content: parsed JSON:', value);
                } catch (e) {
                  console.log('apostrophe-i18n-content: JSON parse failed, keeping as string');
                  // Keep as plain string
                }
              }
              
              // Determine translations source, preferring new 'translations' property
              var translations = {};
              if (value && typeof value === 'object' && value.translations) {
                translations = value.translations;
                console.log('apostrophe-i18n-content: using translations property');
              } else if (value && typeof value === 'object' && value._translations) {
                translations = value._translations;
                console.log('apostrophe-i18n-content: using _translations property');
              } else if (value && typeof value === 'object') {
                // Assume it's already in translation format
                translations = value;
                console.log('apostrophe-i18n-content: using object as translations');
              } else {
                // Single string value -> store in default locale
                translations[defaultLocale] = value || '';
                console.log('apostrophe-i18n-content: storing as plain string in default locale', defaultLocale, value);
              }
              
              // Ensure all configured locales have at least empty string
              _.each(locales, function(locale) {
                if (!translations[locale]) {
                  translations[locale] = '';
                }
              });
              
              // Store both for backward compatibility
              result.translations = translations;
              result._translations = translations;
              
              console.log('apostrophe-i18n-content: result:', result);
              console.log('apostrophe-i18n-content: object before setting:', object);
              object[name] = result;
              console.log('apostrophe-i18n-content: object after setting:', object);
              console.log('apostrophe-i18n-content: converter completed for', name, 'value will be saved');
              return setImmediate(callback);
            } catch (e) {
              console.error('apostrophe-i18n-content: converter error:', e);
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
      return { translations: translations, _translations: translations };
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
      console.log('apostrophe-i18n-content: Registering i18n filter');
      self.apos.templates.addFilter('i18n', self.i18nFilter);
    };

    self.i18nFilter = function(value, locale) {
      console.log('apostrophe-i18n-content: i18n filter called with:', typeof value, value);
      if (!value) return '';
      
      var req = self.apos.templates.contextReq;
      var targetLocale = locale || (req && req.data && req.data.locale) || self.defaultLocale;
      console.log('apostrophe-i18n-content: targetLocale', targetLocale);
      
      // Plain string (non-multilingual) -> return as-is
      if (typeof value === 'string') {
        console.log('apostrophe-i18n-content: returning plain string:', value);
        return value;
      }
      
      // Determine which translations property to use
      var translations = null;
      if (value.translations && typeof value.translations === 'object') {
        translations = value.translations;
      } else if (value._translations && typeof value._translations === 'object') {
        translations = value._translations;
      }
      
      if (translations) {
        var translation = translations[targetLocale] ||
               translations[self.defaultLocale] ||
               '';
        console.log('apostrophe-i18n-content: returning translation:', translation);
        return translation;
      }
      
      // Object with locale keys directly
      if (typeof value === 'object' && value[targetLocale]) {
        console.log('apostrophe-i18n-content: returning direct locale value:', value[targetLocale]);
        return value[targetLocale];
      }
      
      console.log('apostrophe-i18n-content: falling back to String(value):', String(value));
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