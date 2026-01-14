var marked = require('marked');
var sanitizeHtml = require('sanitize-html');

module.exports = {
  extend: 'apostrophe-module',
  name: 'apostrophe-markdown',
  label: 'Markdown Processing',
  
  afterConstruct: function(self) {
    self.addTemplateFilter();
  },
  
  construct: function(self, options) {
    // Configure marked with defaults
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: true,
      mangle: false,
      // marked does not sanitize; we use sanitize-html for sanitization
    });
    
    // Server-side conversion method
    self.convert = function(text, options) {
      if (!text || typeof text !== 'string') {
        return '';
      }
      var opts = options || {};
      
      // Convert markdown to HTML
      var result = marked.parse(text);
      
      // Sanitize HTML
      result = sanitizeHtml(result);

      
      return result;
    };
    
    // Template filter - Overrides apostrophe sanitize mechanism,
    // otherwise markdown output is rendered as plain text 
    self.addTemplateFilter = function() {
      self.apos.templates.addFilter('markdown', function(text, options) {
        return self.apos.templates.safe(self.convert(text, options));
      });
    };
    
    // Composite i18nMarkdown filter if i18n module is available
    if (self.apos.modules['apostrophe-i18n-content']) {
      self.apos.templates.addFilter('i18nMarkdown', function(value, locale, options) {
        var i18n = self.apos.modules['apostrophe-i18n-content'];
        var translated = i18n.i18nFilter(value, locale);
        return self.apos.templates.safe(self.convert(translated, options));
      });
    }
  }
};