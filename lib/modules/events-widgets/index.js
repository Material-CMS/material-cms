module.exports = {
  extend: 'apostrophe-pieces-widgets',
  label: 'Events Widget',
  byAllLabel: 'Upcoming Events',
  byTagLabel: 'Upcoming Events by Tag',
  addFields: [
    {
      name: 'shadowOn',
      label: 'Turn On Text Card Shadow',
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'options', label: 'Options', fields: ['shadowOn'] }
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
  }
}
