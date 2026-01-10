// Language switcher widget - simplified implementation
// Uses page reload by default, with optional AJAX enhancement

apos.utils.widgetPlayers['language-switcher'] = function(el, data, options) {
  // Set cookie helper
  function setLocaleCookie(locale) {
    document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000'; // 1 year
  }

  // Enhanced locale switching with progressive AJAX enhancement
  function switchLocale(locale) {
    // Always set cookie immediately
    setLocaleCookie(locale);
    
    // Progressive enhancement: use AJAX if available AND translations are exposed
    if (apos.utils.ajaxGo && document.querySelector('[data-translations]')) {
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
      // Fallback: page reload (works for production mode)
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