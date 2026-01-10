// Language switcher widget - basic page reload implementation
// Enhanced by translation-utils.js if available (progressive enhancement)

apos.utils.widgetPlayers['language-switcher'] = function(el, data, options) {
  // Set cookie helper
  function setLocaleCookie(locale) {
    document.cookie = 'material-cms.locale=' + locale + '; path=/; max-age=31536000'; // 1 year
  }

  // Basic locale switching with page reload
  function switchLocale(locale) {
    setLocaleCookie(locale);
    window.location.reload();
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