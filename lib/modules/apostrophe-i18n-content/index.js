var _ = require('lodash');
var accepts = require('accepts');
var crypto = require('crypto');

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
    
    // Configuration
    self.cookieName = self.options.cookieName || 'material-cms.locale';

    // Store for use in filter
    self.locales = locales;
    self.defaultLocale = defaultLocale;
    
    // Request-specific translation collection
    self.getRequestTranslations = function(req) {
      if (!req._i18nTranslations) {
        req._i18nTranslations = {};
      }
      return req._i18nTranslations;
    };

    // -------------------------------------------------------------
    // 0. LOCALE DETECTION MIDDLEWARE & CONFIG INJECTION
    // -------------------------------------------------------------
    self.addMiddleware = function() {
      self.apos.app.use(function(req, res, next) {
        // Determine locale from cookie, Accept-Language header, or default
        var cookieLocale = req.cookies ? req.cookies[self.cookieName] : null;
        var acceptLanguage = req.headers['accept-language'];
        var detectedLocale = null;

        // Priority 1: cookie (user's explicit choice)
        if (cookieLocale && locales.indexOf(cookieLocale) !== -1) {
          detectedLocale = cookieLocale;
        }
        // Priority 2: Accept-Language header (browser preference)
        else if (acceptLanguage) {
          // Use accepts package for robust parsing with quality values
          var accept = accepts(req);
          var matchedLocale = accept.language(locales);
          if (matchedLocale) {
            detectedLocale = matchedLocale;
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
        
        // Initialize request translations map
        req._i18nTranslations = {};
        
        // Add translations map to template context
        res.locals.translationsMap = req._i18nTranslations;
        // Also set in req.data for compatibility
        if (!req.data) {
          req.data = {};
        }
        req.data.translationsMap = req._i18nTranslations;
        
        // Inject i18n configuration for frontend
        res.locals.i18nConfig = {
          locales: locales,
          defaultLocale: defaultLocale,
          cookieName: self.cookieName
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
      // Admin UI script (logged-in users only)
      self.pushAsset('script', 'user', { when: 'user' });
    };

    // -------------------------------------------------------------
    // 4. TEMPLATE FILTERS FOR FRONTEND RENDERING
    // -------------------------------------------------------------
    self.addTemplateFilter = function() {
      self.apos.templates.addFilter('i18n', self.i18nFilter);
      self.apos.templates.addFilter('i18nMeta', self.i18nMetaFilter);
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
    
    // i18nMeta filter - same as i18n but with additional sanitization for meta tags
    self.i18nMetaFilter = function(value, locale) {
      var result = self.i18nFilter(value, locale);
      // Trim and ensure it's a string
      result = String(result).trim();
      // Remove any HTML tags for safety in meta tags
      result = result.replace(/<[^>]*>/g, '');
      return result;
    };
    
    // Filter to generate translations attribute for widgets
    self.translationsAttributeFilter = function(value) {
      if (!value || !value.translations || typeof value.translations !== 'object') {
        return self.apos.templates.safe('');
      }
      
      var translations = value.translations;
      
      // Generate deterministic ID based on content hash
      var contentHash = JSON.stringify(translations);
      var id = 't-' + crypto.createHash('md5').update(contentHash).digest('hex').substring(0, 8);
      
      // Store in request-specific translations ONLY (no global map)
      var req = self.apos.templates.contextReq;
      if (req) {
        var reqTranslations = self.getRequestTranslations(req);
        reqTranslations[id] = translations;
      }
      
      return self.apos.templates.safe('data-translation-id="' + id + '"');
    };

    // -------------------------------------------------------------
    // 5. BROWSER-SIDE CONFIGURATION
    // -------------------------------------------------------------
    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions ? superGetCreateSingletonOptions(req) : {};
      options.locales = locales;
      options.defaultLocale = defaultLocale;
      options.cookieName = self.cookieName;
      return options;
    };

    // -------------------------------------------------------------
    // 6. TRANSLATION API ENDPOINTS
    // -------------------------------------------------------------
    self.route('get', 'translations', function(req, res) {
      var ids = req.query.ids || [];
      var locale = req.query.locale || req.data.locale || self.defaultLocale;
      var response = {};
      
      // Convert single ID to array for consistency
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      
      // Fetch translations from request-specific storage ONLY
      var reqTranslations = self.getRequestTranslations(req);
      
      ids.forEach(function(id) {
        if (reqTranslations[id] && reqTranslations[id][locale]) {
          response[id] = reqTranslations[id][locale];
        }
        // NO FALLBACK TO GLOBAL MAP - clean break from old system
      });
      
      return res.send({ status: 'ok', translations: response });
    });

    // Also add a batch endpoint for DeepL integration readiness
    self.route('post', 'translate-batch', function(req, res) {
      if (!req.user) {
        return res.status(401).send({ status: 'error', message: 'Login required' });
      }
      
      var ids = req.body.ids || [];
      var targetLocale = req.body.locale;
      var translations = {};
      
      // This endpoint structure prepares for DeepL integration
      // Currently returns empty translations - DeepL will populate them
      return res.send({
        status: 'ok',
        message: 'Translation endpoint ready for DeepL integration',
        translations: translations
      });
    });
  }
};