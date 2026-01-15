var _ = require('lodash');

module.exports = {
  extend: 'apostrophe-module',
  name: 'apostrophe-i18n-deepl',
  label: 'DeepL Translation',
  viewsFolder: __dirname + '/views',
  
  afterConstruct: function(self) {
    self.addRoutes();
    self.addTasks();
    self.ensureDeepLClient();
    self.pushAssets();
    self.extendWidgets();
  },

  construct: function(self, options) {
    self.apos.utils.log('apostrophe-i18n-deepl: construct called');
    self.deeplApiKey = self.options.apiKey || process.env.DEEPL_API_KEY;
    self.deeplClient = null;
    
    self.extendWidgets = function() {
      self.apos.utils.log('apostrophe-i18n-deepl: extendWidgets called');
      var widgetsModule = self.apos.modules['apostrophe-widgets'];
      if (!widgetsModule) {
        self.apos.utils.error('apostrophe-widgets module not found');
        return;
      }
      
      // Add getEditorControls method to apostrophe-widgets prototype
      if (!widgetsModule.getEditorControls) {
        // Default implementation - can be overridden by specific widget modules
        widgetsModule.getEditorControls = function(req, data) {
          // data contains: widget, options, schema, label from template context
          var label = data.label || 'Widget';
          return [
            {
              type: 'minor',
              action: 'cancel',
              label: 'Cancel'
            },
            {
              type: 'major',
              action: 'save',
              label: 'Save ' + label
            }
          ];
        };
      }
      
      // Add editorControls helper to all widget modules
      Object.keys(self.apos.modules).forEach(function(moduleName) {
        var module = self.apos.modules[moduleName];
        // Check if module extends apostrophe-widgets (including apostrophe-widgets itself)
        if (module.__meta && module.__meta.ancestors && module.__meta.ancestors.includes('apostrophe-widgets')) {
          // Add helper if not already present
          if (!module.editorControls) {
            module.addHelpers({
              editorControls: function() {
                var req = this.apos.templates.contextReq;
                // In template context, `data` contains widget, options, schema, label
                var data = this.apos.templates.contextData;
                var controls = this.getEditorControls(req, data);
                // Use this.partial to render controls partial
                return this.partial('controls', { controls: controls });
              }
            });
          } else {
            self.apos.utils.log('editorControls already present on', moduleName);
          }
        }
      });
      
      // Phase 2.1: Extend getEditorControls for widgets to add DeepL buttons
      if (!widgetsModule._editorControlsExtended) {
        var superGetEditorControls = widgetsModule.getEditorControls;
        if (typeof superGetEditorControls !== 'function') {
          self.apos.utils.error('widgetsModule.getEditorControls is not a function', superGetEditorControls);
          return;
        }
        widgetsModule.getEditorControls = function(req, data) {
          var controls = superGetEditorControls.call(this, req, data);
          
          // Add DeepL buttons for multilingual-string fields
          // data contains schema from template context
          if (data && data.schema) {
            data.schema.forEach(function(field) {
              if (field.type === 'multilingual-string') {
                // Insert before Save button (which is last control)
                controls.splice(controls.length - 1, 0, {
                  type: 'minor',
                  action: 'deepl-translate-' + field.name,
                  label: 'Auto Translate',
                  icon: 'translate'
                });
              }
            });
          }
          
          return controls;
        };
        widgetsModule._editorControlsExtended = true;
      }
    };
    
    self.ensureDeepLClient = function() {
      if (!self.deeplApiKey) {
        self.apos.utils.warn('DeepL API key not configured. Set DEEPL_API_KEY environment variable.');
        return;
      }
      
      try {
        var deepl = require('deepl-node');
        // Determine if using free API (key ends with :fx)
        var options = {};
        if (self.deeplApiKey.endsWith(':fx')) {
          options.freeApi = true;
        }
        self.deeplClient = new deepl.DeepLClient(self.deeplApiKey, options);
      } catch (e) {
        self.apos.utils.error('Failed to initialize DeepL client:', e);
      }
    };

    self.pushAssets = function() {
      self.pushAsset('script', 'widget-editor', { when: 'user', afterLoad: true });
    };

    self.addRoutes = function() {
      // Translate single field endpoint
      self.route('post', 'translate-field', function(req, res) {
        if (!req.user) {
          return res.status(401).send({ status: 'error', message: 'Login required' });
        }
        
        var fieldName = req.body.fieldName;
        var sourceText = req.body.sourceText;
        var sourceLocale = req.body.sourceLocale;
        var targetLocales = req.body.targetLocales || [];
        
        if (!self.deeplClient) {
          return res.status(500).send({
            status: 'error',
            message: 'DeepL not configured. Set DEEPL_API_KEY environment variable.',
            code: 'DEEPL_NOT_CONFIGURED'
          });
        }
        
        // Add input validation
        if (!sourceText || sourceText.trim().length === 0) {
          return res.status(400).send({
            status: 'error',
            message: 'Source text cannot be empty',
            code: 'EMPTY_SOURCE_TEXT'
          });
        }
        
        if (targetLocales.length === 0) {
          return res.status(400).send({
            status: 'error',
            message: 'No target locales specified',
            code: 'NO_TARGET_LOCALES'
          });
        }
        
        // Validate locale codes (simple check)
        var validLocales = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pl', 'pt', 'ru']; // Add as needed
        var invalidLocales = targetLocales.filter(function(locale) {
          return !validLocales.includes(locale.toLowerCase());
        });
        
        if (invalidLocales.length > 0) {
          return res.status(400).send({
            status: 'error',
            message: 'Invalid target locales: ' + invalidLocales.join(', '),
            code: 'INVALID_LOCALES'
          });
        }
        
        // Map locale codes: 'en' -> 'EN'
        var sourceLang = sourceLocale.toUpperCase();
        var translations = {};
        
        // Process each target locale sequentially
        var processNext = function(index) {
          if (index >= targetLocales.length) {
            return res.send({
              status: 'ok',
              translations: translations
            });
          }
          
          var targetLocale = targetLocales[index];
          var targetLang = targetLocale.toUpperCase();
          
          self.deeplClient.translateText(sourceText, sourceLang, targetLang)
            .then(function(result) {
              translations[targetLocale] = result.text;
              processNext(index + 1);
            })
            .catch(function(error) {
              console.error('DeepL translation error:', error);
              // Map common DeepL errors to user-friendly messages
              var userMessage = 'Translation failed for locale ' + targetLocale;
              if (error.message && error.message.includes('quota')) {
                userMessage = 'DeepL API quota exceeded';
              } else if (error.message && error.message.includes('too many requests')) {
                userMessage = 'Too many translation requests. Please wait.';
              } else if (error.message && error.message.includes('invalid')) {
                userMessage = 'Invalid translation request parameters';
              }
              translations[targetLocale] = ''; // Empty on error
              // Optionally log the error for debugging
              self.apos.utils.error('DeepL translation error:', error.message);
              processNext(index + 1);
            });
        };
        
        processNext(0);
      });
      
      // Batch translation endpoint (existing, update with real implementation)
      self.route('post', 'translate-batch', function(req, res) {
        if (!req.user) {
          return res.status(401).send({ status: 'error', message: 'Login required' });
        }
        
        var sourceLocale = req.body.sourceLocale;
        var targetLocale = req.body.targetLocale;
        var contentIds = req.body.contentIds || [];
        
        return res.send({ 
          status: 'ok', 
          message: 'Batch translation endpoint - implement as needed',
          jobId: 'deepl-' + Date.now()
        });
      });
    };
    
    self.addTasks = function() {
      self.apos.tasks.add(self.__meta.name, 'translate-piece', 
        'Translate a specific piece via DeepL',
        function(apos, argv, callback) {
          console.log('DeepL translation task - implement as needed');
          return callback(null);
        }
      );
    };
    
    // Helper method for DeepL API call
    self.callDeepL = function(text, sourceLang, targetLang, callback) {
      if (!self.deeplClient) {
        return callback(new Error('DeepL API key not configured'));
      }
      
      // Validate text length (DeepL has limits)
      if (text.length > 30000) {
        return callback(new Error('Text too long for DeepL translation (max 30000 characters)'));
      }
      
      self.deeplClient.translateText(text, sourceLang.toUpperCase(), targetLang.toUpperCase())
        .then(function(result) {
          callback(null, result.text);
        })
        .catch(function(error) {
          // Map common DeepL errors to user-friendly messages
          var userMessage = 'Translation failed';
          if (error.message && error.message.includes('quota')) {
            userMessage = 'DeepL API quota exceeded';
          } else if (error.message && error.message.includes('too many requests')) {
            userMessage = 'Too many translation requests. Please wait.';
          } else if (error.message && error.message.includes('invalid')) {
            userMessage = 'Invalid translation request parameters';
          }
          
          console.error('DeepL translation error:', error.message);
          callback(new Error(userMessage));
        });
    };
  }
};