// Language switcher widget - simplified implementation
// Uses centralized translations JSON with progressive enhancement

apos.utils.widgetPlayers['language-switcher'] = function(el, data, options) {
  // Set cookie helper
  function setLocaleCookie(locale) {
    document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000'; // 1 year
  }

  // Update translations from centralized JSON map
  function updateTranslationsFromMap(locale) {
    var script = document.getElementById('translations-map');
    if (!script || !script.textContent) {
      return 0;
    }
    
    try {
      var translationsMap = JSON.parse(script.textContent);
      var updatedCount = 0;
      
      // Update all elements with data-translation-id
      document.querySelectorAll('[data-translation-id]').forEach(function(element) {
        var translationId = element.getAttribute('data-translation-id');
        if (translationsMap[translationId] && translationsMap[translationId][locale]) {
          element.textContent = translationsMap[translationId][locale];
          updatedCount++;
        }
      });
      
      return updatedCount;
    } catch (error) {
      console.warn('Failed to parse translations map:', error);
      return 0;
    }
  }

  // Enhanced locale switching with progressive enhancement
  function switchLocale(locale) {
    // Always set cookie immediately
    setLocaleCookie(locale);
    
    // 1. Try centralized translations first
    var updatedCount = updateTranslationsFromMap(locale);
    
    // 2. If we updated at least one element, we're done
    if (updatedCount > 0) {
      console.log('Updated', updatedCount, 'elements via centralized translations');
      return;
    }
    
    // 3. If no centralized translations, check for legacy inline translations
    var hasInlineTranslations = document.querySelector('[data-translations]');
    
    // 4. Progressive enhancement: use AJAX if available
    if (apos.utils.ajaxGo && hasInlineTranslations) {
      // Build URL with locale parameter
      var url = window.location.pathname + window.location.search;
      
      // Remove existing locale parameter if present
      url = url.replace(/[?&]locale=[^&]*/, '');
      
      // Add new locale parameter
      var separator = url.includes('?') ? '&' : '?';
      var targetUrl = url + separator + 'locale=' + locale;
      
      // Use AJAX navigation with 'page' context
      apos.utils.ajaxGo('page', targetUrl);
    } else {
      // 5. Fallback: page reload (always works)
      window.location.reload();
    }
  }

  // Handle dropdown change
  var select = el.querySelector('[data-apos-language-switcher-select]');
  if (select) {
    select.addEventListener('change', function(e) {
      switchLocale(e.target.value);
    });
  }

  // Handle link clicks
  var links = el.querySelectorAll('[data-locale]');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var locale = this.getAttribute('data-locale');
      switchLocale(locale);
    });
  });

  // Handle button clicks (if any)
  var buttons = el.querySelectorAll('[data-locale-button]');
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      var locale = this.getAttribute('data-locale-button');
      switchLocale(locale);
    });
  });
};