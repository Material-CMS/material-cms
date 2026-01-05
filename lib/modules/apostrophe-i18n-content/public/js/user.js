apos.define('apostrophe-i18n-content', {
  afterConstruct: function(self) {
    self.addFieldType();
  },
  construct: function(self, options) {
    self.locales = options.locales || ['en'];
    self.defaultLocale = options.defaultLocale || 'en';
    
    self.addFieldType = function() {
      apos.schemas.addFieldType({
        name: 'multilingual-string',
        populate: self.populate,
        convert: self.convert
      });
    };
    
    // Populate the field when the modal opens
    self.populate = function(object, name, $field, $el, field, callback) {
      var $fieldset = apos.schemas.findFieldset($el, name);
      var $container = $fieldset.find('[data-multilingual-string]');
      var $inputs = $container.find('[data-locale-input]');
      var $hidden = $container.find('[data-multilingual-value]');
      
      // Get current value from object (already stored in the doc)
      var currentValue = object[name];
      
      // Determine what format the value is in
      var translations = {};
      if (currentValue && currentValue.translations && typeof currentValue.translations === 'object') {
        translations = currentValue.translations;
      } else if (currentValue && typeof currentValue === 'object') {
        // Assume locale keys directly
        translations = currentValue;
      } else if (typeof currentValue === 'string') {
        // Plain string -> default locale
        translations[self.defaultLocale] = currentValue;
      }
      
      // Fill inputs
      $inputs.each(function() {
        var locale = $(this).attr('data-locale-input');
        $(this).val(translations[locale] || '');
      });
      
      // Update hidden input with current translations
      self.updateHiddenValue($container, $hidden, $inputs);
      
      // Attach input handlers
      $inputs.on('input', function() {
        self.updateHiddenValue($container, $hidden, $inputs);
      });
      
      // Store the hidden input reference on the fieldset for convert
      $fieldset.data('multilingual-hidden', $hidden);
      
      return setImmediate(callback);
    };
    
    // Convert user input back to object for saving
    self.convert = function(object, name, $field, $el, field, callback) {
      var $fieldset = apos.schemas.findFieldset($el, name);
      var $hidden = $fieldset.data('multilingual-hidden');
      
      if (!$hidden || !$hidden.length) {
        // Fallback: find it again
        var $container = $fieldset.find('[data-multilingual-string]');
        $hidden = $container.find('[data-multilingual-value]');
      }
      
      var value = $hidden.val();
      var parsed = {};
      
      if (value && value.trim() !== '') {
        try {
          parsed = JSON.parse(value);
        } catch (e) {
          // Keep empty object
        }
      }
      
      // Determine translations source
      var translations = {};
      if (parsed.translations && typeof parsed.translations === 'object') {
        translations = parsed.translations;
      }
      
      // Ensure all locales have at least empty string
      _.each(self.locales, function(locale) {
        if (!translations[locale]) {
          translations[locale] = '';
        }
      });
      
      // Store translations property
      object[name] = {
        translations: translations
      };
      
      // Validate required field
      if (field.required) {
        var hasContent = _.some(translations, function(text) {
          return text && text.trim() !== '';
        });
        if (!hasContent) {
          return setImmediate(_.partial(callback, 'required'));
        }
      }
      
      return setImmediate(callback);
    };
    
    // Helper to update hidden input with current translations
    self.updateHiddenValue = function($container, $hidden, $inputs) {
      var translations = {};
      $inputs.each(function() {
        var locale = $(this).attr('data-locale-input');
        translations[locale] = $(this).val();
      });
      $hidden.val(JSON.stringify({ translations: translations }));
    };
  }
});
