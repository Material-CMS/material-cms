module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  addFields: [
    {
      name: 'title',
      type: 'boolean',
      label: 'Show Image Titles',
      help: 'Choose to show the titles of image or multiple images in slideshow. (default: No)',
      def: false
    },
    {
      name: 'gradientColorTop',
      label: 'Gradient Color Top',
      type: 'color',
      help: 'Choose the top gradient color for image overlay. (otherwise main color is taken when background active)'
    },
    {
      name: 'gradientColorBottom',
      label: 'Gradient Color Bottom',
      type: 'color',
      help: 'Choose the Bbottom gradient color for image overlay. (otherwise accent color is taken when background active)'
    },
    {
      name: 'animated',
      type: 'boolean',
      label: 'Activate Kenburns Effect',
      help: 'Activate kenburns effect, meaning the backround image moves. (default: No)',
      def: false
    },
    {
      name: 'sliderHalf',
      type: 'boolean',
      label: 'Slider Half Screen',
      help: 'Set slider height to half screen. (default: Yes)',
      def: true
    },
    {
      name: 'sliderIndicators',
      type: 'select',
      label: 'Show Indicators',
      help: 'Choose to show indicators. (default: No)',
      choices: [
        {
          label: 'No',
          value: false,
          def: true
        },
        {
          label: 'Yes',
          value: true,
        },
      ]
    },
    {
      name: 'sliderInterval',
      label: 'Set Slider Interval',
      type: 'range',
      help: 'Choose the interval in which the slider moves trough images. (format: ms, default: 4000)',
      min: 500,
      max: 10000,
      step: 100,
      def: 4000
    },
    {
      name: 'imageCaptionAlign',
      type: 'select',
      label: 'Image Caption Text Align',
      help: 'Choose the image text align. (left, center, right)',
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
      name: 'imageCaptionColor',
      label: 'Image Caption Color',
      type: 'color',
      help: 'Choose the color for the image caption'
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    {
    	name: 'images',
    	label: 'Images',
    	fields: [
        '_pieces'
      ]
    },
    {
    	name: 'colors',
    	label: 'Colors',
    	fields: [
        'gradientColorTop',
        'gradientColorBottom',
        'imageCaptionColor'
      ]
    },
    {
    	name: 'options',
    	label: 'Options',
    	fields: [
        'title',
        'animated',
        'sliderHalf',
        'sliderIndicators',
        'sliderInterval',
        'imageCaptionAlign'
      ]
    }
  ],
  // Push awlays and lean scripts
  construct: function(self, options) {
    if (self.apos.assets.options.lean) {
      if (self.options.player) {
        self.pushAsset('script', 'lean', { when: 'lean' });
      }
    } else {
      self.pushAsset('script', 'always', { when: 'always' });
    }
  }
};
