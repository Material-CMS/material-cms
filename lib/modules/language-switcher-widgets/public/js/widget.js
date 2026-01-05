apos.utils.widgetPlayers['language-switcher'] = function(el, data, options) {
  // Set cookie helper
  function setLocaleCookie(locale) {
    document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000'; // 1 year
  }

  // Parse translations data (handles both JSON and Base64 encoded JSON)
  function parseTranslations(data) {
    if (!data) return null;
    
    // Try to parse as JSON first (for backward compatibility)
    try {
      return JSON.parse(data);
    } catch (e1) {
      // If JSON parsing fails, try Base64 decoding
      try {
        // Check if it looks like Base64 (alphanumeric with = padding)
        if (/^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
          var decoded = atob(data);
          return JSON.parse(decoded);
        }
      } catch (e2) {
        // Not Base64 or invalid JSON
        console.warn('Failed to parse translations data as JSON or Base64:', data);
        return null;
      }
    }
    
    return null;
  }

  // Switch locale instantly for elements with data-translations attribute
  function switchLocale(locale) {
    setLocaleCookie(locale);

    // Update all elements with data-translations
    var elements = document.querySelectorAll('[data-translations]');
    var updatedCount = 0;
    
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var translationsData = el.getAttribute('data-translations');
      if (!translationsData) continue;

      try {
        var translations = parseTranslations(translationsData);
        if (translations && typeof translations === 'object' && translations[locale]) {
          // Update text content (preserving any HTML? we assume plain text)
          el.textContent = translations[locale];
          updatedCount++;
        }
      } catch (e) {
        console.warn('Failed to parse data-translations for element', el, e);
      }
    }
    
    // If no elements were updated (translations not exposed), fall back to page reload
    if (updatedCount === 0) {
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
};