module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  addFields: [
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
      name: 'effect',
      type: 'select',
      label: 'Select Effect',
      help: 'Choose effect for swiper. (default: No)',
      choices: [
        {
          label: 'Slide',
          value: 'slide',
          def: true
        },
        {
          label: 'Fade',
          value: 'fade'
        },
        {
          label: 'Coverflow',
          value: 'coverflow'
        },
        {
          label: 'Flip',
          value: 'flip'
        },
        {
          label: 'Cube',
          value: 'cube'
        }
      ]
    },
    {
      name: 'slidesPerView',
      label: 'Slides Per View',
      type: 'range',
      help: 'Choose how much slides you want to show on the view. (default: 1)',
      min: 1,
      max: 4,
      step: 1,
      def: 1
    },
    {
			name: 'loop',
			label: 'Loop Swiper',
			type: 'boolean',
			help: 'Activate loop for swiper. (default: No)',
			def: false
		},
    {
      name: 'autoplay',
      type: 'select',
      label: 'Activate Autoplay',
      help: 'Activate autoplay for swiper. (default: No)',
      choices: [
        {
          label: 'Yes',
          value: true,
          showFields: [ 'delay', 'disableOnInteraction']
        },
        {
          label: 'No',
          value: false,
          def: true
        }
      ]
    },
    {
      name: 'disableOnInteraction',
      label: 'Autoplay Disable on Interactiom',
      type: 'boolean',
      help: 'Stop swiper on interaction. (default: No)',
      def: false
    },
    {
			name: 'speed',
			label: 'Swipe Speed',
			type: 'range',
			help: 'Choose speed of transition between swpipes. (format: ms, default: 300)',
			min: 100,
			max: 2000,
			step: 100,
			def: 300
		},
		{
			name: 'delay',
			label: 'Autoplay Delay',
			type: 'range',
			help: 'Choose delay before swiper starts. (format: ms, default: 3000)',
			min: 1000,
			max: 10000,
			step: 1000,
			def: 3000
		},
    {
      name: 'pagination',
      type: 'select',
      label: 'Pagination Bullets',
      help: 'Show pagination bullets. (default: No)',
      choices: [
        {
          label: 'Yes',
          value: true,
          showFields: [ 'paginationType' ]
        },
        {
          label: 'No',
          value: false,
          def: true
        }
      ]
    },
    {
      name: 'paginationType',
      type: 'select',
      label: 'Pagination Bullets',
      help: 'Show pagination bullets. (default: No)',
      choices: [
        {
          label: 'Bullets',
          value: 'bullets',
          def: true
        },
        {
          label: 'Fraction',
          value: 'fraction'
        },
        {
          label: 'Progressbar',
          value: 'progressbar'
        }
      ]
    },
    {
      name: 'sliderHeight',
      label: 'Slider Height',
      type: 'range',
      help: 'Choose height of the slider (default: 50vh)',
      min: 30,
      max: 100,
      step: 5,
      def: 50
    },
    {
      name: 'shapeDivider',
      label: 'Add Shape Divier',
      type: 'area',
      htmlHelp: 'Shape divider will be shown at slider bottom.',
      options: {
        widgets: {
          'shape-divider-path': {
            controls: {
              cloneable: false
            }
          },
          'shape-divider-file': {
            controls: {
              cloneable: false
            }
          }
        }
      }
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
        'gradientColorBottom'
      ]
    },
    {
      name: 'shape',
      label: 'Shape Divider',
      fields: [
        'shapeDivider',
      ]
    },
    {
    	name: 'options',
    	label: 'Options',
    	fields: [
        'effect',
        'pagination',
        'paginationType',
        'slidesPerView',
        'loop',
        'autoplay',
        'disableOnInteraction',
        'speed',
        'delay',
        'animated',
        'sliderHeight'
      ]
    }
  ],
  // Push awlays and lean scripts
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
