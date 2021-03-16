module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  addFields: [
    {
      name: 'title',
      type: 'boolean',
      label: 'Show Image Titles',
      help: 'Choose to show the titles of image or multiple images in slideshow (default: No)',
      def: false
    },
    {
      name: 'header',
      type: 'string',
      label: 'Slider Content Header',
      help: 'Choose a optional header for slider content (will be shown as h1)'
    },
    {
      name: 'gradientColorTop',
      label: 'Gradient Color Top',
      type: 'color',
      help: 'Choose the top gradient color for image overlay (otherwise main color is taken when background active)'
    },
    {
      name: 'gradientColorBottom',
      label: 'Gradient Color Bottom',
      type: 'color',
      help: 'Choose the Bbottom gradient color for image overlay (otherwise accent color is taken when background active)'
    },
    {
      name: 'headerAlign',
      type: 'select',
      label: 'Header Text Align',
      help: 'Choose header text align (left, center, right)',
      choices: [
        {
          label: 'Left',
          value: 'left',
          def: true
        },
        {
          label: 'Center',
          value: 'center'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ]
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
      fields: [ '_pieces', 'header', 'headerAlign' ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [ 'title', 'animated', 'sliderHalf', 'indicatorsBottom' ]
    }
  ]
};
