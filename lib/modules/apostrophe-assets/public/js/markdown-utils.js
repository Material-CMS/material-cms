// Markdown rendering utilities for client-side markdown processing
// Loaded as part of apostrophe-assets bundle

// Initialize immediately when script loads
(function() {
  // Don't wait for DOMContentLoaded - initialize as soon as marked is available
  function initMarkdownUtils() {
    // Check if marked is available
    if (typeof marked === 'undefined') {
      // Try again in a moment if marked hasn't loaded yet
      setTimeout(initMarkdownUtils, 50);
      return;
    }
    
    // Configure marked with same options as server-side
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false
    });
    
    // Ensure apos exists
    if (typeof apos === 'undefined') {
      // Create apos if it doesn't exist (shouldn't happen in Apostrophe)
      window.apos = window.apos || {};
    }
    
    // Client-side markdown rendering utility
    apos.markdown = {
      // Render markdown text to HTML with basic sanitization
      render: function(text, options) {
        if (!text || typeof text !== 'string') {
          return '';
        }
        var opts = options || {};
        
        // Convert markdown to HTML
        var result = marked.parse(text);
        
        // Basic sanitization (remove script tags, etc.)
        result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        result = result.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
        
        return result;
      },
      
      // Check if element contains markdown (has data-markdown attribute)
      isMarkdownElement: function(element) {
        return element && element.hasAttribute && element.hasAttribute('data-markdown');
      },
      
      // Update element with markdown rendering
      updateElement: function(element, markdownText) {
        if (!element || !markdownText) {
          return false;
        }
        
        try {
          var html = this.render(markdownText);
          element.innerHTML = html;
          return true;
        } catch (e) {
          console.error('apos.markdown: Failed to render markdown', e);
          element.textContent = markdownText; // Fallback to plain text
          return false;
        }
      }
    };
    
    // Mark as initialized
    apos.markdown._initialized = true;
  }
  
  // Start initialization
  initMarkdownUtils();
})();