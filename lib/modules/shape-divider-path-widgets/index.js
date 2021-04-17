module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Shape Divider Path',
  addFields: [
    {
      name: 'shapeDivider',
      type: 'string',
      label: 'Shape Divider',
      htmlHelp: 'Add a custom shape divider to the bottom of parallax image. add some d path from <a href="https://www.shapedivider.app/" target="new_window" title="Here">here</a>.' + '<br />' +
      '(for example: M1200 0L0 0 598.97 114.72 1200 0z)'
    },
    {
      name: 'shapeDividerViewBox',
      type: 'string',
      label: 'Shape Divider ViewBox',
      htmlHelp: 'All shape dividers need "viewBox" values.'  + '<br />' +
      '<a href="https://www.geeksforgeeks.org/svg-viewbox-attribute/" target="new_window" title="Here">Here</a> is there a good explanation on how to use it.'
    },
    {
      name: 'shapeDividerInvert',
      type: 'boolean',
      label: 'Invert Shape Divider',
      help: 'Set to yes invert the top shape divider (default: No)',
      def: false
    },
    {
      name: 'shapeDividerHeight',
      label: 'Shape Divider Height',
      type: 'range',
      help: 'Choose the height of section shape dividers. (format: 100vw * x, default: 0.05)',
      min: 0.05,
      max: 0.2,
      step: 0.01,
      def: 0.05
    },
    {
      name: 'shapeDividerColor',
      type: 'color',
      label: 'Shape Divider Color',
      help: 'Override shape divider with individual color. (default: Background color)'
    },
  ]
};
