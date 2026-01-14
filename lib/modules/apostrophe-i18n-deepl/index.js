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
  },

  construct: function(self, options) {
    self.deeplApiKey = self.options.apiKey || process.env.DEEPL_API_KEY;
    self.deeplClient = null;
    
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
      self.pushAsset('script', 'widget-editor', { when: 'user' });
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
        
        // Map locale codes: 'en' -> 'EN', 'de' -> 'DE'
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