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
      // Build query string with proper array format ids[]=...
      var queryParams = [];
      ids.forEach(function(id) {
        queryParams.push('ids[]=' + encodeURIComponent(id));
      });
      queryParams.push('locale=' + encodeURIComponent(locale));
      var url = '/modules/apostrophe-i18n-content/translations?' + queryParams.join('&');
      
      apos.utils.get(url, {}, function(err, result) {
        if (err || !result || !result.translations) {
          resolve({ updated: 0, error: err });
          return;
        }
        
        var updatedCount = 0;
        var hasTranslations = Object.keys(result.translations).length > 0;
        translationElements.forEach(function(element) {
          var translationId = element.getAttribute('data-translation-id');
          if (result.translations.hasOwnProperty(translationId)) {
            var translation = String(result.translations[translationId]);
            // Handle meta tags
            if (element.tagName === 'META') {
              element.setAttribute('content', translation);
              // If this is the title meta tag, also update document.title
              if (element.getAttribute('name') === 'title') {
                document.title = translation;
              }
            }
            // Handle title span (inside <title> element)
            else if (element.closest('title')) {
              // Title elements should only contain plain text, never markdown
              element.textContent = translation;
              // Ensure document.title reflects plain text (strip any HTML)
              var plainText = translation.replace(/<[^>]*>/g, '');
              document.title = plainText;
            }
            // Handle regular elements
            else {
              // Check if element has markdown
              if (element.hasAttribute('data-markdown') && typeof apos !== 'undefined' && apos.markdown) {
                element.innerHTML = apos.markdown.render(translation);
              } else {
                element.textContent = translation;
              }
            }
            updatedCount++;
          }
        });
        
        // If we have translations and at least one element updated, consider success
        resolve({ updated: updatedCount, hasTranslations: hasTranslations });
      });
    });
  }

  // SwitchLocale
  function switchLocale(locale) {
    setLocaleCookie(locale);
    
    updateTranslationsViaAPI(locale).then(function(result) {
      // If we have translations from API (even if no DOM elements matched) OR updated elements
      if (result.updated > 0 || result.hasTranslations) {
        // Ensure document.title is updated correctly (fallback)
        var titleSpan = document.querySelector('title span[data-translation-id]');
        if (titleSpan && titleSpan.textContent && titleSpan.textContent !== document.title) {
          document.title = titleSpan.textContent;
        }
        return;
      }
      
      // No translations available → page reload required
      window.location.reload();
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