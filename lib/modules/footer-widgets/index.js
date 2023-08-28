module.exports = {
  extend: 'apostrophe-widgets',
  name: 'footer',
  label: 'Footer Widget',
  addFields: [
    {
      name: 'bigFooter',
      label: 'Big Footer',
      type: 'boolean',
      help: 'Shows page navigation and about fields in footer. (default: Yes)',
      def: true
    },
    {
      name: 'aboutTitle',
      label: 'About Fields Title',
      type: 'string',
      help: 'Rename title of about fields in footer to something more personal than "About", override global settings here.'
    },
    {
      name: 'footerPrivacy',
      label: 'Footer Privacy Button',
      type: 'string',
      help: 'Rename footer privacy button to something other than "Privacy", override global settings here.'
    },
    {
      name: 'footerLegal',
      label: 'Footer Legal Button',
      type: 'string',
      help: 'Rename footer legal button to something other than "Legal", override global settings here.'
    },
    {
      name: 'footerColor',
      label: 'Footer Color',
      type: 'color',
      help: 'Footer uses navigation color by default, override global settings here.'
    },
    {
      name: 'footerTextColor',
      label: 'Footer Text Color',
      type: 'color',
      help: 'Footer text uses text color by default, override global settings here.'
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    {
      name: 'options',
      label: 'Options',
      fields: [
        'bigFooter',
        'footerPrivacy',
        'aboutTitle',
        'footerLegal',
      ]
    },
    {
      name: 'colors',
      label: 'Colors',
      fields: [
        'footerColor',
        'footerTextColor',
      ]
    }
  ],
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
    // Add CSS classes to the outer wrapper div of the widget.
    self.getWidgetWrapperClasses = function(widget) {
      return [
        'footer-widget-wrapper'
      ];
    };
    // Render own Routes for injecting footer and legal content as iframes
    // THIS IS NICE! to add own routes to widget
    self.renderRoute('get', 'legal', function(req, res, next) {
      return next(null, {
        template: 'legal'
      });
    });
    self.renderRoute('get', 'privacy', function(req, res, next) {
      return next(null, {
        template: 'privacy'
      });
    });
  }
};
