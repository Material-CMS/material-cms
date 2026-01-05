module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Language Switcher',
  addFields: [
    {
      name: 'style',
      type: 'select',
      label: 'Switcher Style',
      choices: [
        {
          label: 'Dropdown',
          value: 'dropdown',
          def: true
        },
        {
          label: 'List of links',
          value: 'list'
        },
        {
          label: 'Flags',
          value: 'flags'
        }
      ]
    },
    {
      name: 'showLabels',
      type: 'boolean',
      label: 'Show language labels',
      help: 'Display language labels (e.g., "English") alongside codes',
      def: true
    },
    {
      name: 'showFlags',
      type: 'boolean',
      label: 'Show flags',
      help: 'Display flag icons (requires flag assets)',
      def: false
    }
  ],
  construct: function(self, options) {
    var superLoad = self.load;
    self.load = function(req, widgets, callback) {
      // Get locales from apostrophe-i18n-content module
      var i18nModule = self.apos.modules['apostrophe-i18n-content'];
      var locales = i18nModule ? i18nModule.locales : ['en'];
      var defaultLocale = i18nModule ? i18nModule.defaultLocale : 'en';
      
      // Attach locale data to each widget
      widgets.forEach(function(widget) {
        widget.locales = locales;
        widget.defaultLocale = defaultLocale;
        widget.currentLocale = req.data.locale || defaultLocale;
      });
      
      return superLoad(req, widgets, callback);
    };

    self.pushAssets = function() {
      self.pushAsset('script', 'widget', { when: 'lean' });
    };
  }
};