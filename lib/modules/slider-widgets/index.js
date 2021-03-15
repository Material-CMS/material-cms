module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  addFields: [
    {
      name: 'title',
      type: 'boolean',
      label: 'Show Image Titles',
      help: 'Choose to show the titles of image or multiple images in slideshow (default: Yes)',
      def: true
    },
    {
      name: 'animated',
      type: 'boolean',
      label: 'Activate Kenburns Effect',
      help: 'Activate kenburns effect, meaning the backround image moves (default: No)',
      def: false
    },
    {
      name: 'sliderHalf',
      type: 'boolean',
      label: 'Slider Half Screen',
      help: 'Set slider height to half screen (default: No)',
      def: true
    },
    {
      name: 'indicatorsBottom',
      label: 'Indicators Distance to Bottom',
      type: 'range',
      help: 'Choose the distance of the slider indicators to the bottom (format: px, default: 30)',
      min: 10,
      max: 150,
      step: 10,
      def: 30
    },
    {
      name: 'sliderExtra',
      type: 'area',
      contextual: true
    }
  ],
  arrangeFields: [
    {
      name: 'images',
      label: 'Images',
      fields: [ '_pieces' ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [ 'title', 'animated', 'sliderHalf', 'indicatorsBottom' ]
    }
  ]
};
