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
      var $hidden = $field.find('[data-multilingual-value]');
      var fieldName = $hidden.attr('name');
      
      // Load existing value
      var currentValue = JSON.parse($hidden.val() || '{}');
      if (currentValue && currentValue._translations) {
        _.each(currentValue._translations, function(text, locale) {
          $field.find('[data-locale-input="' + locale + '"]').val(text);
        });
      } else if (typeof currentValue === 'string') {
        // Backward compatibility: plain string in default locale
        $field.find('[data-locale-input="' + self.defaultLocale + '"]').val(currentValue);
        self.updateHiddenValue($field, $hidden, $inputs);
      }
      
      // Update on input
      $inputs.on('input', function() {
        self.updateHiddenValue($field, $hidden, $inputs);
      });
    };
    
    self.updateHiddenValue = function($field, $hidden, $inputs) {
      var translations = {};
      $inputs.each(function() {
        var locale = $(this).attr('data-locale-input');
        translations[locale] = $(this).val();
      });
      $hidden.val(JSON.stringify({ _translations: translations }));
    };
  }
});
