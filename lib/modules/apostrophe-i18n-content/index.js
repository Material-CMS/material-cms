var _ = require('lodash');
var accepts = require('accepts');

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
    self.cookieName = self.options.cookieName || 'material-cms.locale';

    // Store for use in filter
    self.locales = locales;
    self.defaultLocale = defaultLocale;
    
    // DeepL integration configuration
    self.deeplConfig = self.options.deepl || {};
    self.deeplApiKey = self.deeplConfig.apiKey;
    self.deeplAutoTranslate = self.deeplConfig.autoTranslate === true;
    self.deeplSourceLocale = self.deeplConfig.sourceLocale || defaultLocale;
    self.deeplTargetLocales = self.deeplConfig.targetLocales || _.filter(locales, function(locale) {
      return locale !== self.deeplSourceLocale;
    });
    self.deeplFields = self.deeplConfig.fields; // optional array
    self.deeplApiOptions = self.deeplConfig.apiOptions || {};
    
    // DeepL client (lazy-loaded)
    self.getDeepLClient = function() {
      if (!self._deeplClient && self.deeplApiKey) {
        try {
          var deepl = require('deepl-node');
          self._deeplClient = new deepl.DeepLClient(self.deeplApiKey, self.deeplApiOptions);
        } catch (e) {
          self.apos.utils.error('Failed to initialize DeepL client:', e);
          self._deeplClient = null;
        }
      }
      return self._deeplClient;
    };
    
    // Centralized translation storage (per request)
    self.nextTranslationId = 1; // Fallback counter for generating unique IDs (when request not available)
    
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
        
        // Initialize request translations map and counter
        req._i18nTranslations = {};
        req._i18nNextTranslationId = 1;
        
        // Add translations map to template context
        res.locals.translationsMap = req._i18nTranslations;
        // Also set in req.data for compatibility
        if (!req.data) {
          req.data = {};
        }
        req.data.translationsMap = req._i18nTranslations;
        
        // Inject i18n configuration for frontend
        res.locals.i18nConfig = {
          exposeTranslations: self.exposeTranslations,
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
          form: 'csv',
          // Database converter: ensure stored as { translations: ... }
          database: function(req, data, name, object, field, callback) {
            try {
              var value = data[name];
              var translations = {};
              
              // If value is already a translations object, keep it
              if (value && typeof value === 'object' && value.translations) {
                translations = value.translations;
              } else if (value && typeof value === 'object') {
                // Might be locale keys directly
                translations = value;
              } else {
                // Plain string: treat as default locale
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
          }
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
        // If translation is an object with a 'text' property, use that
        if (translation && typeof translation === 'object' && translation.text !== undefined) {
          translation = translation.text;
        }
        return translation;
      }
      
      // Object with locale keys directly
      if (typeof value === 'object' && value[targetLocale]) {
        var translation = value[targetLocale];
        if (translation && typeof translation === 'object' && translation.text !== undefined) {
          translation = translation.text;
        }
        return translation;
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
      
      // If not exposing translations, return empty string
      if (!self.exposeTranslations) {
        return self.apos.templates.safe('');
      }
      
      // Generate unique ID for this translation
      var req = self.apos.templates.contextReq;
      var id;
      if (req && req._i18nNextTranslationId) {
        id = 'translation-' + req._i18nNextTranslationId++;
      } else {
        // Fallback to module-level counter (should rarely happen)
        id = 'translation-' + self.nextTranslationId++;
      }
      
      // Store in request-specific translations map
      if (req) {
        var reqTranslations = self.getRequestTranslations(req);
        reqTranslations[id] = translations;
        // Debug logging (development only)
        self.apos.utils.info('Added translation to map:', id, Object.keys(translations));
      }
      
      // Return data-translation-id attribute
      return self.apos.templates.safe('data-translation-id="' + id + '"');
    };

    // Helper to collect multilingual-string fields from a document recursively
    self.collectMultilingualFields = function(doc, schema, sourceLocale, targetLocales, deeplFields) {
      var batches = {};
      targetLocales.forEach(function(locale) {
        batches[locale] = [];
      });
      
      // Walk schema-based fields
      var walkSchema = function(schema, data, path) {
        self.apos.utils.info('Walking schema with', schema.length, 'fields at path', path);
        schema.forEach(function(field) {
          var fieldName = field.name;
          var value = data ? data[fieldName] : undefined;
          
          self.apos.utils.info('Walking field', fieldName, 'type', field.type, 'path', path);
          
          // Handle area fields
          if (field.type === 'area' || field.type === 'widgets') {
            self.apos.utils.info('Walking area field', fieldName, 'items count:', value && value.items ? value.items.length : 0);
            if (value && Array.isArray(value.items)) {
              value.items.forEach(function(item, index) {
                if (!item.type) return;
                // Get widget schema from modules
                var widgetModule = self.apos.modules[item.type];
                if (!widgetModule || !widgetModule.schema) {
                  // Try with -widgets suffix
                  widgetModule = self.apos.modules[item.type + '-widgets'];
                }
                if (widgetModule && widgetModule.schema) {
                  walkSchema(widgetModule.schema, item, path + '.' + fieldName + '.items[' + index + ']');
                } else {
                  self.apos.utils.warn('Widget module not found for type', item.type);
                }
              });
            }
            return;
          }
          
          // Handle multilingual-string fields
          if (field.type === 'multilingual-string') {
            // Optional field name restriction
            if (deeplFields && deeplFields.length && deeplFields.indexOf(fieldName) === -1) {
              return;
            }
            
            var translations = value && value.translations;
            if (!translations) {
              self.apos.utils.info('No translations for', fieldName);
              return;
            }
            
            // Ensure source locale has non-empty text
            var sourceText = translations[sourceLocale];
            if (!sourceText) {
              self.apos.utils.info('No source text for', fieldName, 'locale', sourceLocale);
              return;
            }
            // Extract text property if object
            if (typeof sourceText === 'object' && sourceText.text !== undefined) {
              sourceText = sourceText.text;
            }
            if (!sourceText || sourceText.trim() === '') {
              self.apos.utils.info('Source text empty for', fieldName);
              return;
            }
            
            // For each target locale where translation is missing
            targetLocales.forEach(function(targetLocale) {
              var existing = translations[targetLocale];
              // Missing if empty string, undefined, or plain empty string
              var missing = !existing || existing === '' || (typeof existing === 'object' && existing.text === '');
              if (missing) {
                self.apos.utils.info('Found missing translation for', fieldName, 'locale', targetLocale, 'path', path);
                batches[targetLocale].push({
                  path: path + '.' + fieldName,
                  sourceText: sourceText,
                  translations: translations
                });
              } else {
                self.apos.utils.info('Translation already exists for', fieldName, 'locale', targetLocale, 'value', existing);
              }
            });
          }
        });
      };
      
      // Also traverse the document recursively to find areas not defined in schema
      var traverseObject = function(obj, path) {
        if (!obj || typeof obj !== 'object') return;
        // Check if this object is an area (has items array)
        if (Array.isArray(obj.items)) {
          self.apos.utils.info('Found area at path', path, 'items count:', obj.items.length);
          obj.items.forEach(function(item, index) {
            if (!item.type) {
              self.apos.utils.info('Item without type at', path + '.items[' + index + ']');
              return;
            }
            self.apos.utils.info('Item type', item.type, 'at', path + '.items[' + index + ']');
            var widgetModule = self.apos.modules[item.type];
            if (!widgetModule || !widgetModule.schema) {
              // Try with -widgets suffix
              widgetModule = self.apos.modules[item.type + '-widgets'];
            }
            if (widgetModule && widgetModule.schema) {
              walkSchema(widgetModule.schema, item, path + '.items[' + index + ']');
            } else {
              self.apos.utils.warn('Widget module not found for type', item.type, 'at', path);
              // Still traverse the item object for nested areas
              traverseObject(item, path + '.items[' + index + ']');
            }
          });
        }
        // Recursively traverse other object properties
        Object.keys(obj).forEach(function(key) {
          if (key === 'items' || key === 'translations') return; // already handled
          var val = obj[key];
          if (val && typeof val === 'object') {
            traverseObject(val, path + '.' + key);
          }
        });
      };
      
      walkSchema(schema, doc, '');
      traverseObject(doc, '');
      
      self.apos.utils.info('Collected batches:', Object.keys(batches).map(function(locale) {
        return locale + ': ' + batches[locale].length;
      }));
      return batches;
    };
    
    // -------------------------------------------------------------
    // 6. DEEPL AUTO-TRANSLATION
    // -------------------------------------------------------------
    self.on('apostrophe-docs:beforeSave', 'autoTranslateMissing', async function(req, doc, options) {
      // Skip if auto-translation is disabled or no API key
      if (!self.deeplAutoTranslate || !self.deeplApiKey) {
        self.apos.utils.info('DeepL auto-translation disabled or missing API key');
        return;
      }
      
      self.apos.utils.info('DeepL auto-translation triggered for doc type:', doc.type);
      
      // Get DeepL client
      var client = self.getDeepLClient();
      if (!client) {
        self.apos.utils.warn('DeepL client not available, skipping auto-translation');
        return;
      }
      
      // Determine source locale
      var sourceLocale = self.deeplSourceLocale;
      // Determine target locales
      var targetLocales = self.deeplTargetLocales;
      
      // Get the document's schema
      var manager = self.apos.docs.getManager(doc.type);
      if (!manager) {
        return;
      }
      var schema = manager.schema;
      
      // Collect missing translations per target locale (including nested areas)
      var batches = self.collectMultilingualFields(doc, schema, sourceLocale, targetLocales, self.deeplFields);
      
      // Log total batches
      var total = 0;
      for (var locale in batches) {
        total += batches[locale].length;
      }
      self.apos.utils.info('Total missing translations found:', total);
      
      // Perform batch translation per target locale
      for (var targetLocale in batches) {
        var batch = batches[targetLocale];
        if (batch.length === 0) {
          continue;
        }
        
        self.apos.utils.info('Translating', batch.length, 'text(s) to', targetLocale);
        var sourceTexts = batch.map(function(item) { return item.sourceText; });
        
        try {
          var results = await client.translateText(sourceTexts, sourceLocale, targetLocale);
          // results is an array of TextResult
          for (var i = 0; i < results.length; i++) {
            var item = batch[i];
            var translatedText = results[i].text;
            // Create translation object with metadata
            var translationObj = {
              text: translatedText,
              source: sourceLocale,
              provider: 'deepl'
            };
            // Update translations object (already referenced)
            item.translations[targetLocale] = translationObj;
            self.apos.utils.info('Translated', item.path, 'to', targetLocale, ':', translatedText.substring(0, 50));
            self.apos.utils.info('Updated translations:', JSON.stringify(item.translations));
          }
        } catch (error) {
          self.apos.utils.error('DeepL translation failed for locale ' + targetLocale + ':', error);
          // Continue with other locales
        }
      }
    });

    // -------------------------------------------------------------
    // 7. TASK FOR TESTING CONVERTER
    // -------------------------------------------------------------
    self.addTask('test-converter', 'Test multilingual-string converter', function(apos, argv, callback) {
      var req = self.apos.tasks.getReq();
      // Find a section piece with header widget
      self.apos.docs.getManager('section').find(req, { _id: 'clhvwts87000ylmg1incdzf4n' }).toObject(function(err, doc) {
        if (err) {
          console.error(err);
          return callback(err);
        }
        if (!doc) {
          console.log('Section not found');
          return callback();
        }
        console.log('Section doc:', JSON.stringify(doc, null, 2));
        // Look at content area
        if (doc.content && doc.content.items) {
          doc.content.items.forEach(function(item, idx) {
            if (item.type === 'header') {
              console.log('Header widget item:', JSON.stringify(item, null, 2));
              console.log('Header field value:', item.header);
              console.log('Type of header:', typeof item.header);
              if (item.header && item.header.translations) {
                console.log('Translations:', JSON.stringify(item.header.translations, null, 2));
              }
            }
          });
        }
        // Save the doc without changes to trigger converters
        self.apos.docs.getManager('section').update(req, { _id: doc._id }, doc, function(err) {
          if (err) {
            console.error('Save error:', err);
            return callback(err);
          }
          console.log('Saved, fetching again...');
          self.apos.docs.getManager('section').find(req, { _id: doc._id }).toObject(function(err, doc2) {
            if (err) {
              console.error(err);
              return callback(err);
            }
            console.log('After save, header field:', doc2.content.items[0].header);
            callback();
          });
        });
      });
    });

    // -------------------------------------------------------------
    // 5. BROWSER-SIDE CONFIGURATION
    // -------------------------------------------------------------
    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions ? superGetCreateSingletonOptions(req) : {};
      options.locales = locales;
      options.defaultLocale = defaultLocale;
      options.exposeTranslations = self.exposeTranslations;
      options.cookieName = self.cookieName;
      return options;
    };
  }
};