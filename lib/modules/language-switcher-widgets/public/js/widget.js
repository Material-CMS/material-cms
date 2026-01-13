// Language switcher widget - API implementation
// Uses translation API endpoint for on-demand translation fetching

apos.utils.widgetPlayers['language-switcher'] = function(el, data, options) {
  // Set cookie helper
  function setLocaleCookie(locale) {
    document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000';
  }

  // API-based translation update
  function updateTranslationsViaAPI(locale) {
    var translationElements = document.querySelectorAll('[data-translation-id]');
    if (translationElements.length === 0) {
      return Promise.resolve({ updated: 0 });
    }
    
    var ids = Array.from(translationElements).map(function(el) {
      return el.getAttribute('data-translation-id');
    });
    
    return new Promise(function(resolve) {
      apos.utils.get('/modules/apostrophe-i18n-content/translations', {
        ids: ids,
        locale: locale
      }, function(err, result) {
        if (err || !result || !result.translations) {
          console.warn('Translation API failed, using AJAX navigation:', err);
          resolve({ updated: 0, error: err });
          return;
        }
        
        var updatedCount = 0;
        translationElements.forEach(function(element) {
          var translationId = element.getAttribute('data-translation-id');
          if (result.translations[translationId]) {
            element.textContent = result.translations[translationId];
            updatedCount++;
          }
        });
        
        resolve({ updated: updatedCount });
      });
    });
  }

  // SwitchLocale
  function switchLocale(locale) {
    setLocaleCookie(locale);
    
    updateTranslationsViaAPI(locale).then(function(result) {
      if (result.updated > 0) {
        console.log('Updated', result.updated, 'elements via translation API');
        return;
      }
      
      // If API returns no translations, use AJAX navigation
      if (apos.utils.ajaxGo) {
        var url = window.location.pathname + window.location.search;
        url = url.replace(/[?&]locale=[^&]*/, '');
        var separator = url.includes('?') ? '&' : '?';
        var targetUrl = url + separator + 'locale=' + locale;
        apos.utils.ajaxGo('page', targetUrl);
      } 
      
      else {
        // Final fallback: page reload (should rarely happen)
        window.location.reload();
      }
    });
  }

  // Event handlers
  var select = el.querySelector('[data-apos-language-switcher-select]');
  if (select) {
    select.addEventListener('change', function(e) {
      switchLocale(e.target.value);
    });
  }

  var links = el.querySelectorAll('[data-locale]');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var locale = this.getAttribute('data-locale');
      switchLocale(locale);
    });
  });

  var buttons = el.querySelectorAll('[data-locale-button]');
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      var locale = this.getAttribute('data-locale-button');
      switchLocale(locale);
    });
  });
};