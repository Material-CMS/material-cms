module.exports = {
  extend: 'apostrophe-pieces-widgets',
  label: 'Events Widget',
  byAllLabel: 'Upcoming Events',
  byTagLabel: 'Upcoming Events by Tag',
  addFields: [
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Element Shadow',
      help: 'Choose if the events widget should have a shadow. (default: Yes)',
      def: true
    },
    {
      name: 'accordion',
      type: 'boolean',
      label: 'Accordion',
      help: 'Activate to change animation collabsibles of events to accordion. (Default: No)',
      def: false
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    {
      name: 'events',
      label: 'Events',
      fields: [
        'by',
        'limitByAll',
        '_pieces',
        'tags',
        'limitByTag',
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'shadow',
        'accordion'
      ]
    }
  ],
  afterConstruct: function(self) {
    self.pushAssets();
  },
  construct: function(self, options) {
    // Append upcoming flag by extending widgetCursor.
    var superWidgetCursor = self.widgetCursor;
    self.widgetCursor = function(req, criteria) {
      return superWidgetCursor(req, criteria).upcoming(true);
    };
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
