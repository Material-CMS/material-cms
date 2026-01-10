// Shared translation utilities for multi-language support
// This module enhances language switchers with AJAX capabilities when available
// Falls back to page reload when translations not exposed or AJAX not available

(function() {
  // Check if apos.utils already has translationUtils
  if (apos.utils.translationUtils) {
    return;
  }

  apos.utils.translationUtils = {
    // -------------------------------------------------------------
    // 0. INITIALIZATION - Enhance language switchers on DOM ready
    // -------------------------------------------------------------
    
    /**
     * Initialize translation utilities
     * Enhances language switcher widgets with AJAX capabilities
     */
    init: function() {
      var self = this;
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          self._enhanceLanguageSwitchers();
        });
      } else {
        self._enhanceLanguageSwitchers();
      }
    },
    
    /**
     * Enhance all language switcher widgets on the page
     * @private
     */
    _enhanceLanguageSwitchers: function() {
      var self = this;
      
      // Find all language switcher widgets
      var widgets = document.querySelectorAll('[data-apos-widget="language-switcher"]');
      
      widgets.forEach(function(widget) {
        self._enhanceLanguageSwitcher(widget);
      });
      
      // Also enhance any language switchers that might be loaded later via AJAX
      if (apos.utils && apos.utils.on) {
        apos.utils.on('enhance', function($el) {
          var newWidgets = $el[0].querySelectorAll('[data-apos-widget="language-switcher"]');
          newWidgets.forEach(function(widget) {
            self._enhanceLanguageSwitcher(widget);
          });
        });
      }
    },
    
    /**
     * Enhance a single language switcher widget
     * @private
     */
    _enhanceLanguageSwitcher: function(widget) {
      var self = this;
      
      // Skip if already enhanced
      if (widget.getAttribute('data-translation-enhanced')) {
        return;
      }
      widget.setAttribute('data-translation-enhanced', 'true');
      
      // Enhance dropdowns
      var select = widget.querySelector('[data-apos-language-switcher-select]');
      if (select) {
        var originalHandler = select._translationOriginalHandler;
        if (originalHandler) {
          select.removeEventListener('change', originalHandler);
        }
        
        select.addEventListener('change', function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.switchLocale(e.target.value);
        });
      }
      
      // Enhance links
      var links = widget.querySelectorAll('[data-locale]');
      links.forEach(function(link) {
        var originalHandler = link._translationOriginalHandler;
        if (originalHandler) {
          link.removeEventListener('click', originalHandler);
        }
        
        var newHandler = function(e) {
          e.preventDefault();
          e.stopPropagation();
          var locale = this.getAttribute('data-locale');
          self.switchLocale(locale);
        };
        
        link.addEventListener('click', newHandler);
        link._translationOriginalHandler = newHandler;
      });
      
      // Enhance buttons
      var buttons = widget.querySelectorAll('[data-locale-button]');
      buttons.forEach(function(button) {
        var originalHandler = button._translationOriginalHandler;
        if (originalHandler) {
          button.removeEventListener('click', originalHandler);
        }
        
        var newHandler = function(e) {
          e.preventDefault();
          e.stopPropagation();
          var locale = this.getAttribute('data-locale-button');
          self.switchLocale(locale);
        };
        
        button.addEventListener('click', newHandler);
        button._translationOriginalHandler = newHandler;
      });
    },
    
    // -------------------------------------------------------------
    // 1. PARSING UTILITIES
    // -------------------------------------------------------------
    
    /**
     * Parse translations data (handles both JSON and Base64 encoded JSON)
     * @param {string} data - The data attribute value
     * @returns {Object|null} Parsed translations object or null
     */
    parseTranslations: function(data) {
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
    },
    
    // -------------------------------------------------------------
    // 2. CONFIGURATION CHECK
    // -------------------------------------------------------------
    
    /**
     * Check if translations are exposed in HTML (based on module configuration)
     * @returns {boolean} True if translations are exposed
     */
    areTranslationsExposed: function() {
      // Check if there are any elements with data-translations attribute
      // This is a reliable indicator that translations are exposed in HTML
      var elements = document.querySelectorAll('[data-translations]');
      return elements.length > 0;
    },
    
    /**
     * Get the cookie name used for locale storage
     * @returns {string} Cookie name
     */
    getLocaleCookieName: function() {
      if (apos.modules['apostrophe-i18n-content']) {
        return apos.modules['apostrophe-i18n-content'].cookieName || 'material-cms.locale';
      }
      return 'material-cms.locale';
    },
    
    // -------------------------------------------------------------
    // 3. COOKIE MANAGEMENT
    // -------------------------------------------------------------
    
    /**
     * Set locale cookie
     * @param {string} locale - Locale code (e.g., 'en', 'de')
     */
    setLocaleCookie: function(locale) {
      var cookieName = this.getLocaleCookieName();
      document.cookie = cookieName + '=' + locale + '; path=/; max-age=31536000'; // 1 year
    },
    
    /**
     * Get current locale from cookie
     * @returns {string|null} Locale code or null
     */
    getLocaleFromCookie: function() {
      var cookieName = this.getLocaleCookieName();
      var match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
      return match ? match[2] : null;
    },
    
    // -------------------------------------------------------------
    // 4. LOCALE SWITCHING
    // -------------------------------------------------------------
    
    /**
     * Switch to a different locale
     * @param {string} locale - Target locale code
     * @param {Object} options - Additional options
     * @param {boolean} options.forceReload - Force page reload instead of AJAX
     */
    switchLocale: function(locale, options) {
      options = options || {};
      
      // 1. Set cookie immediately for consistency
      this.setLocaleCookie(locale);
      
      // 2. Try to update elements with existing inline translations
      var updatedCount = this.updateAllElementsWithInlineTranslations(locale);
      
      // 3. If we updated at least one element, we're done
      if (updatedCount > 0) {
        return;
      }
      
      // 4. If no elements were updated, check if translations are exposed
      var translationsExposed = this.areTranslationsExposed();
      
      // 5. If not exposed → window.location.reload()
      if (!translationsExposed || options.forceReload) {
        window.location.reload();
        return;
      }
      
      // 6. If exposed and AJAX available → use it
      if (apos.ui && apos.ui.ajaxGo) {
        // Full Apostrophe mode with jQuery
        this._switchLocaleWithAjax(locale);
        return;
      } else if (apos.utils && apos.utils.ajaxGo) {
        // Lean mode with our ajax-utils
        this._switchLocaleWithAjax(locale);
        return;
      }
      
      // 7. If exposed but no AJAX → fetch() + DOM replacement (fallback)
      this._switchLocaleWithFetch(locale);
    },
    
    /**
     * Switch locale using Apostrophe's AJAX system
     * @private
     */
    _switchLocaleWithAjax: function(locale) {
      var currentUrl = window.location.pathname + window.location.search;
      
      // Remove existing locale parameter if present
      currentUrl = currentUrl.replace(/[?&]locale=[^&]*/, '');
      
      // Add new locale parameter
      var separator = currentUrl.includes('?') ? '&' : '?';
      var url = currentUrl + separator + 'locale=' + locale;
      
      // Check for AJAX context in the page
      var ajaxContext = this._detectAjaxContext();
      
      // Use the appropriate AJAX method
      if (apos.ui && apos.ui.ajaxGo) {
        // Full Apostrophe mode
        apos.ui.ajaxGo(ajaxContext, url);
      } else if (apos.utils && apos.utils.ajaxGo) {
        // Lean mode with our ajax-utils
        apos.utils.ajaxGo(ajaxContext, url);
      } else {
        // Fallback to page reload
        window.location.href = url;
      }
    },
    
    /**
     * Switch locale using fetch() API for lean mode (no jQuery)
     * @private
     */
    _switchLocaleWithFetch: function(locale) {
      var self = this;
      var currentUrl = window.location.pathname + window.location.search;
      
      // Remove existing locale parameter if present
      currentUrl = currentUrl.replace(/[?&]locale=[^&]*/, '');
      
      // Add new locale parameter
      var separator = currentUrl.includes('?') ? '&' : '?';
      var url = currentUrl + separator + 'locale=' + locale;
      
      // Use fetch to get the page
      fetch(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'text/html'
        }
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(function(html) {
        // Parse the HTML response
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        
        // Find the main content area
        var newContent = self._extractContentFromResponse(doc);
        var currentContent = self._getCurrentContentArea();
        
        if (newContent && currentContent) {
          // Replace content
          currentContent.innerHTML = newContent.innerHTML;
          
          // Reinitialize widget players for the new content
          self._reinitializeWidgets(currentContent);
          
          // Update browser history
          window.history.pushState({ aposAjax: true }, '', url);
        } else {
          // Fallback to page reload if content extraction fails
          window.location.reload();
        }
      })
      .catch(function(error) {
        console.error('Error switching locale with fetch:', error);
        window.location.reload();
      });
    },
    
    /**
     * Detect AJAX context from the page
     * @private
     * @returns {string} AJAX context name
     */
    _detectAjaxContext: function() {
      // Look for data-apos-ajax-context attribute
      var contextElement = document.querySelector('[data-apos-ajax-context]');
      if (contextElement) {
        return contextElement.getAttribute('data-apos-ajax-context');
      }
      
      // Default context
      return 'page';
    },
    
    /**
     * Extract content from AJAX response
     * @private
     */
    _extractContentFromResponse: function(doc) {
      // Try to find content by AJAX context
      var context = this._detectAjaxContext();
      var selector = '[data-apos-ajax-context="' + context + '"]';
      var content = doc.querySelector(selector);
      
      if (content) {
        return content;
      }
      
      // Fallback: look for main content area
      return doc.querySelector('main') || doc.querySelector('.main-content') || doc.body;
    },
    
    /**
     * Get current content area
     * @private
     */
    _getCurrentContentArea: function() {
      var context = this._detectAjaxContext();
      var selector = '[data-apos-ajax-context="' + context + '"]';
      var content = document.querySelector(selector);
      
      if (content) {
        return content;
      }
      
      // Fallback
      return document.querySelector('main') || document.querySelector('.main-content') || document.body;
    },
    
    /**
     * Reinitialize widget players in the updated content
     * @private
     */
    _reinitializeWidgets: function(container) {
      // Find all widgets in the container
      var widgets = container.querySelectorAll('[data-apos-widget]');
      
      widgets.forEach(function(widgetEl) {
        var data = widgetEl.getAttribute('data-apos-widget');
        if (!data) return;
        
        try {
          var widgetData = JSON.parse(data);
          var type = widgetData.type;
          
          // Check if there's a player for this widget type
          if (apos.utils.widgetPlayers && apos.utils.widgetPlayers[type]) {
            apos.utils.widgetPlayers[type](widgetEl, widgetData, {});
          }
        } catch (e) {
          console.warn('Failed to reinitialize widget:', e);
        }
      });
    },
    
    // -------------------------------------------------------------
    // 5. TRANSLATIONS MAP (for centralized storage - Phase 2)
    // -------------------------------------------------------------
    
    /**
     * Get translations map from centralized script tag
     * @returns {Object|null} Translations map or null
     */
    getTranslationsMap: function() {
      var script = document.getElementById('translations-map');
      if (!script || !script.textContent) {
        return null;
      }
      
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        console.warn('Failed to parse translations map:', e);
        return null;
      }
    },
    
    /**
     * Update element text using translations map
     * @param {string} elementId - Element ID
     * @param {string} locale - Target locale
     * @returns {boolean} True if translation was applied
     */
    updateElementWithMap: function(elementId, locale) {
      var map = this.getTranslationsMap();
      if (!map || !map[elementId]) {
        return false;
      }
      
      var element = document.getElementById(elementId);
      if (!element) {
        return false;
      }
      
      var translations = map[elementId];
      if (translations && translations[locale]) {
        element.textContent = translations[locale];
        return true;
      }
      
      return false;
    },
    
    /**
     * Update all elements with data-translation-id attribute
     * @param {string} locale - Target locale
     * @returns {number} Number of elements updated
     */
    updateAllElementsWithMap: function(locale) {
      var map = this.getTranslationsMap();
      if (!map) {
        return 0;
      }
      
      var elements = document.querySelectorAll('[data-translation-id]');
      var updatedCount = 0;
      
      elements.forEach(function(element) {
        var translationId = element.getAttribute('data-translation-id');
        if (!translationId || !map[translationId]) {
          return;
        }
        
        var translations = map[translationId];
        if (translations && translations[locale]) {
          element.textContent = translations[locale];
          updatedCount++;
        }
      });
      
      return updatedCount;
    },
    
    // -------------------------------------------------------------
    // 6. LEGACY SUPPORT (current inline translations)
    // -------------------------------------------------------------
    
    /**
     * Update all elements with data-translations attribute (legacy)
     * @param {string} locale - Target locale
     * @returns {number} Number of elements updated
     */
    updateAllElementsWithInlineTranslations: function(locale) {
      var elements = document.querySelectorAll('[data-translations]');
      var updatedCount = 0;
      
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var translationsData = element.getAttribute('data-translations');
        if (!translationsData) continue;
        
        try {
          var translations = this.parseTranslations(translationsData);
          if (translations && typeof translations === 'object' && translations[locale]) {
            element.textContent = translations[locale];
            updatedCount++;
          }
        } catch (e) {
          console.warn('Failed to parse data-translations for element', element, e);
        }
      }
      
      return updatedCount;
    }
  };
  
  // Initialize translation utilities when DOM is ready
  apos.utils.onReady(function() {
    apos.utils.translationUtils.init();
  });
})();