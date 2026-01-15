// lib/modules/apostrophe-i18n-deepl/public/js/widget-editor.js
// DeepL translation button handler for widget editors with multilingual-string fields
// Uses Apostrophe's control array system and action handling

apos.on('ready', function() {

  // Listen for deepl-translate actions
  apos.on('deeplTranslate', function(data) {
    if (data.modal && data.fieldName) {
      deeplTranslate(data.modal, data.fieldName);
    }
  });

  // Attach click handlers to Auto Translate buttons in modals
  var selector = '[data-apos-deepl-translate]';
  $(document).on('click', selector, function(e) {
    e.preventDefault();
    var $button = $(this);
    var fieldName = $button.attr('data-apos-deepl-translate');

    // Find the modal - button is guaranteed to be inside modal.$el
    // Beware Apostrophes documentation is wrong. This is the right modal
    var $modal = $button.closest('[data-modal]');
    var modal = $modal.data('aposModal');

    if (modal) {
      apos.emit('deeplTranslate', { modal: modal, fieldName: fieldName });
    } else {
      // This should never happen unless Apostrophe's modal system is broken
      console.error('DeepL: Could not find modal object for button');
    }
    
  });
});

/**
 * Perform DeepL translation for a specific field
 */
function deeplTranslate(modal, fieldName) {
  
  // Strip quotes from fieldName if present (e.g., ""header"" -> header)
  var cleanFieldName = fieldName.replace(/^"+|"+$/g, '');
  var $fieldset = apos.schemas.findFieldset(modal.$el, cleanFieldName);
  var $container = $fieldset.find('[data-multilingual-string]');
  var $inputs = $container.find('[data-locale-input]');
  
  // Get default locale from modal options or fallback
  var defaultLocale = modal.options.defaultLocale || 'en';
  var $sourceInput = $container.find('[data-locale-input="' + defaultLocale + '"]');
  var sourceText = $sourceInput.val().trim();
  
  if (!sourceText) {
    apos.notify('Please enter text in the default locale first', { type: 'error' });
    return;
  }
  
  // Get target locales (empty ones)
  var targetLocales = [];
  $inputs.each(function() {
    var locale = $(this).attr('data-locale-input');
    var value = $(this).val().trim();
    if (locale !== defaultLocale && !value) {
      targetLocales.push(locale);
    }
  });
  
  if (targetLocales.length === 0) {
    apos.notify('All translations already filled', { type: 'info' });
    return;
  }
  
  // Show loading indicator (auto-dismiss after 5 seconds)
  apos.notify('Translating via DeepL...', { type: 'info', dismiss: 5 });
  
  // Always use the full path to DeepL module API endpoint
  var apiUrl = '/modules/apostrophe-i18n-deepl/translate-field';
  
  // Use apos.utils.post for CSRF-protected AJAX
  apos.utils.post(apiUrl, {
    fieldName: cleanFieldName,
    sourceText: sourceText,
    sourceLocale: defaultLocale,
    targetLocales: targetLocales
  }, function(err, result) {
    if (err) {
      console.error('DeepL API error:', err);
      var errorMsg = 'Translation request failed: ' + (err.message || err.status || 'Unknown error');
      apos.notify(errorMsg, { type: 'error' });
      return;
    }
    
    // Handle null or undefined result
    if (!result) {
      apos.notify('Translation failed: No response from server', { type: 'error' });
      return;
    }
    
    if (result.status === 'ok' && result.translations) {
      
      // Populate target locale inputs
      Object.keys(result.translations).forEach(function(locale) {
        var selector = '[data-locale-input="' + locale + '"]';
        var input = $container.find(selector)[0];
        if (input) input.value = result.translations[locale];
      });
      
      // Update hidden JSON value
      var $hidden = $container.find('[data-multilingual-value]');
      var translations = {};
      $inputs.each(function() {
        var locale = this.getAttribute('data-locale-input');
        translations[locale] = this.value;
      });
      $hidden.val(JSON.stringify({ translations: translations }));
      
      apos.notify('Translations added', { type: 'success' });
    } else {
      apos.notify(result.message || 'Translation failed', { type: 'error' });
    }
  });
}

// Make deeplTranslate function available
window.deeplTranslate = deeplTranslate;