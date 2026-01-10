// Lean-mode AJAX utilities for dynamic content loading
// Provides functionality similar to apos.ui.ajaxGo but without jQuery dependency

(function() {
  // Don't redefine if already exists
  if (apos.utils.ajaxGo) {
    return;
  }

  // Default AJAX context selector
  var DEFAULT_CONTEXT_SELECTOR = '[data-apos-ajax-context="page"]';

  /**
   * Load content via AJAX and replace the specified context
   * @param {string} context - AJAX context name (e.g., 'page')
   * @param {string} url - URL to load
   * @param {Object} options - Additional options
   */
  apos.utils.ajaxGo = function(context, url, options) {
    options = options || {};
    
    // Ensure locale parameter is preserved in AJAX navigation
    url = ensureLocaleParameter(url);
    
    // Find the context element
    var selector = options.selector || '[data-apos-ajax-context="' + context + '"]';
    var contextEl = document.querySelector(selector);
    
    if (!contextEl) {
      console.warn('AJAX context not found:', context);
      // Fallback to page reload
      window.location.href = url;
      return;
    }
    
    // Show loading indicator if specified
    var loadingEl = options.loadingSelector ? document.querySelector(options.loadingSelector) : null;
    if (loadingEl) {
      loadingEl.style.display = 'block';
    }
    
    // Use apos.utils.get for lean mode compatibility
    apos.utils.get(url, null, function(err, response) {
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      
      if (err) {
        console.error('AJAX request failed:', err);
        // Fallback to page reload on error
        window.location.href = url;
        return;
      }
      
      // Parse the HTML response
      var parser = new DOMParser();
      var doc = parser.parseFromString(response, 'text/html');
      
      // Find the same context in the response
      var newContent = doc.querySelector(selector);
      if (!newContent) {
        console.warn('AJAX response does not contain context:', context);
        window.location.href = url;
        return;
      }
      
      // Replace content
      contextEl.innerHTML = newContent.innerHTML;
      
      // Update browser history if not disabled
      if (options.push !== false) {
        window.history.pushState({ aposAjax: true, context: context }, '', url);
      }
      
      // Run widget players on new content
      apos.utils.runPlayers(contextEl);
      
      // Emit event for other code to hook into
      apos.utils.emit(document.body, 'apos-ajax-loaded', {
        context: context,
        url: url,
        element: contextEl
      });
      
      // Call success callback if provided
      if (options.success) {
        options.success(response);
      }
    });
  };

  /**
   * Append content via AJAX (for infinite scroll, etc.)
   * @param {string} context - AJAX context name
   * @param {string} url - URL to load
   * @param {Object} options - Additional options
   */
  apos.utils.ajaxAppend = function(context, url, options) {
    options = options || {};
    
    // Find the context element
    var selector = options.selector || '[data-apos-ajax-append="' + context + '"]';
    var contextEl = document.querySelector(selector);
    
    if (!contextEl) {
      console.warn('AJAX append context not found:', context);
      return;
    }
    
    // Show loading indicator if specified
    var loadingEl = options.loadingSelector ? document.querySelector(options.loadingSelector) : null;
    if (loadingEl) {
      loadingEl.style.display = 'block';
    }
    
    // Use apos.utils.get for lean mode compatibility
    apos.utils.get(url, null, function(err, response) {
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      
      if (err) {
        console.error('AJAX append request failed:', err);
        return;
      }
      
      // Parse the HTML response
      var parser = new DOMParser();
      var doc = parser.parseFromString(response, 'text/html');
      
      // Find content to append
      var newContent = doc.querySelector(selector);
      if (!newContent) {
        // Try to find any content with the append attribute
        newContent = doc.querySelector('[data-apos-ajax-append]');
      }
      
      if (!newContent) {
        console.warn('AJAX append response does not contain appendable content');
        return;
      }
      
      // Append the children of newContent, not newContent itself
      // This prevents nesting of container elements
      while (newContent.firstChild) {
        contextEl.appendChild(newContent.firstChild);
      }
      
      // Run widget players on the new content within contextEl
      apos.utils.runPlayers(contextEl);
      
      // Emit event for other code to hook into
      apos.utils.emit(document.body, 'apos-ajax-appended', {
        context: context,
        url: url,
        element: contextEl
      });
      
      // Call success callback if provided
      if (options.success) {
        options.success(response);
      }
    });
  };

  /**
   * Initialize AJAX navigation (handles browser back/forward)
   */
  apos.utils.initAjaxNavigation = function() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
      if (event.state && event.state.aposAjax) {
        // Reload the page for now (could be enhanced to cache and restore)
        window.location.reload();
      }
    });
    
    // Intercept link clicks with data-apos-ajax attribute
    document.addEventListener('click', function(event) {
      var target = event.target;
      
      // Find the closest anchor tag
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
        if (!target) return;
      }
      
      var href = target.getAttribute('href');
      var ajaxContext = target.getAttribute('data-apos-ajax');
      
      if (!href || !ajaxContext) {
        return;
      }
      
      // Prevent default navigation
      event.preventDefault();
      
      // Use ajaxGo for this link
      apos.utils.ajaxGo(ajaxContext, href);
    });
  };

  // Initialize AJAX navigation when DOM is ready
  apos.utils.onReady(function() {
    apos.utils.initAjaxNavigation();
  });

  /**
   * Helper to ensure locale parameter is preserved in AJAX navigation
   * This is called internally by ajaxGo to maintain locale state
   * @private
   */
  function ensureLocaleParameter(url) {
    // Get current locale from cookie if available
    var match = document.cookie.match(/(^| )material-cms\.locale=([^;]+)/);
    var locale = match ? match[2] : null;
    
    if (!locale) {
      return url;
    }
    
    // Check if URL already has a locale parameter
    if (url.includes('locale=')) {
      return url;
    }
    
    // Add locale parameter if not present
    var separator = url.includes('?') ? '&' : '?';
    return url + separator + 'locale=' + locale;
  }

})();