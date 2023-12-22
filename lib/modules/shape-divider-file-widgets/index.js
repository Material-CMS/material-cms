module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Shape Divider File',
  alias: 'shapeFile',
  addFields: [
    {
      name: '_shapeDividerFile',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Shape Divider File',
      help: 'Add shape divider image in SVG format',
      limit: 1,
      noHeight: true,
      filters: {
        // fileType: 'svg',
        projection: {
          attachment: 1
        }
      }
    },
    {
      name: 'shapeDividerFlip',
      type: 'boolean',
      label: 'Flip Shape Divider',
      htmlHelphelp: 'Flip shape divider orientation'  + '<br />' +
      '(This is useful if you want a file which is made for the top at the bottom)',
      def: false
    },
    {
      name: 'shapeDividerInvert',
      type: 'boolean',
      label: 'Invert Shape Divider',
      help: 'Set to yes invert the top shape divider (default: No)',
      def: false
    },
    {
      name: 'shapeDividerColor',
      type: 'color',
      label: 'Shape Divider Color',
      help: 'Override shape divider with individual color. (default: Background color)'
    },
  ],
  // Add lean and always materialize initialization with parameters
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
