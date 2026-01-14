// lib/modules/apostrophe-i18n-deepl/public/js/widget-editor.js
// DeepL translation button handler for widget editors with multilingual-string fields
// Buttons are added via template override in lib/modules/apostrophe-widgets/views/baseWidgetEditor.html
// This script just adds click handlers to those buttons

apos.on('ready', function() {
  // Listen for modal stack push - the correct event for new modals
  apos.on('modalStackPush', function() {
    // Get the top modal from the stack
    var stack = apos.modalSupport && apos.modalSupport.stack;
    if (!stack || stack.length === 0) {
      return;
    }
    var $topModal = stack[stack.length - 1];
    if (!$topModal) {
      return;
    }
    var modal = $topModal.data('aposModal');
    if (modal) {
      // Wait a tiny bit for modal to be fully rendered
      setTimeout(function() {
        processModal(modal);
      }, 50);
    }
  });
  
  // Also process any already open modals (should be none at ready)
  setTimeout(function() {
    var $modals = $('.apos-modal');
    $modals.each(function() {
      var $modal = $(this);
      var modal = $modal.data('aposModal');
      if (modal) {
        processModal(modal);
      }
    });
  }, 100);
});

function processModal(modal) {
  // Check if this is a widget editor modal
  var modalCurrent = modal.$el.attr('data-apos-modal-current');
  if (!modalCurrent) {
    return;
  }
  
  // Look for DeepL translate buttons and attach click handlers
  var $buttons = modal.$el.find('[data-deepl-translate]');
  if ($buttons.length) {
    $buttons.each(function() {
      var $btn = $(this);
      var fieldName = $btn.attr('data-field');
      if (fieldName) {
        // Remove any existing click handlers to avoid duplicates
        $btn.off('click.deepl');
        $btn.on('click.deepl', function() {
          deeplTranslate(modal, fieldName);
        });
      }
    });
  }
}

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
  
  console.log('Calling DeepL API:', apiUrl, {
    fieldName: cleanFieldName,
    sourceText: sourceText,
    sourceLocale: defaultLocale,
    targetLocales: targetLocales
  });
  
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
    
    console.log('DeepL API response:', result);
    
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