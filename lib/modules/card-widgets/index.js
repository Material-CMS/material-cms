module.exports = {
	extend: 'apostrophe-images-widgets',
	piecesModuleName: 'apostrophe-images',
	label: 'Image Widget',
	defer: true,
	addFields: [
		{
			name: 'shadow',
			type: 'boolean',
			label: 'Element Shadow',
			help: 'Choose if the image widget should have a shadow. (default: Yes)',
			def: true
		},
		{
			name: 'titleDisplay',
			type: 'select',
			label: 'Show Image Title',
			help: 'Choose whether to display the title of the image. (default: No)',
			choices: [
				{
					label: 'No',
					value: false,
					def: true
				},
				{
					label: 'Yes',
					value: true,
					showFields: [
						'titleAlign',
						'titleColor',
					]
				}
			]
		},
		{
			name: 'titleAlign',
			type: 'select',
			label: 'Title Align',
			help: 'Choose align for title and description (either center, left or right)',
			choices: [
				{
					label: 'Center align',
					value: 'center-align',
				},
				{
					label: 'Left Align',
					value: 'left-align'
				},
				{
					label: 'Right Align',
					value: 'right-align'
				}
			]
		},
		{
			name: 'titleColor',
			type: 'color',
			label: 'Image Title Color',
			help: 'Choose a color for image title'
		},
		{
			name: 'gradientColorTop',
			label: 'Gradient Color Top',
			type: 'color',
			help: 'Choose top gradient color for image overlay'

		},
		{
			name: 'gradientColorBottom',
			label: 'Gradient Color Bottom',
			type: 'color',
			help: 'Choose bottom gradient color for image overlay'
		},
		{
			name: 'clickAction',
			type: 'select',
			label: 'Images Click Action',
			htmlHelp: 'Choose click action for image (eather open image in a lightbox or open an link or expand image with addtional content or deactivate click on image completely, default: lightbox).' + '<br />' + '<br />' +
			'<span>Lightbox:</span> opens fullscreen image in lightbox plugin on click' + '<br />' + '<br />' +
			'<span>Link:</span> jumps to page anchor or external page and shows gradient overlay on hover' + '<br />' + '<br />' +
			'<span>Expand:</span> expands image in a modal and show additional witdgets' + '<br />' + '<br />' +
			'<span>Off:</span> deactivates click on image',
			choices: [
				{
					label: 'Lightbox',
					value: 'clickActionLightbox',
					def: true,
				},
				{
					label: 'Link',
					value: 'clickActionLink',
					showFields: [
						'clickActionLinkArea',
						'gradientColorTop',
						'gradientColorBottom',
						'clickActionBottom'
					]
				},
				{
					label: 'Anime',
					value: 'clickActionAnime',
					showFields: [
						'animeWidgets'
					]
				},
				{
					label: 'Off',
					value: false,
					def: true
				}
			]
		},
		{
			name: 'clickActionLinkArea',
			label: 'Click Action Link',
			type: 'area',
			help: 'Coose a link with is opened when you click on the image.',
			options: {
				limit: 1,
				widgets: {
					'link': {},
					'link-page': {}
				}
			}
		},
		{
			name: 'clickActionBottom',
			type: 'boolean',
			label: 'Click Action Text Bottom',
			help: 'Shor the click action text on the bottom of the image (default: No)',
			def: true
		},
		{
			name: 'animeWidgets',
			type: 'area',
			options: {
				widgets: {
					'texts': {
						controls: {
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					},
					'video': {
						controls: {
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					}
				}
			}
		}
  ],
	// Fields Arrangement
	arrangeFields: [
		{
			name: 'image',
			label: 'Image',
			fields: [
				'_pieces'
			]
		},
		{
			name: 'title',
			label: 'Title',
			fields: [
				'titleDisplay',
				'titleAlign',
				'titleColor'
			]
		},
		{
			name: 'imageOptions',
			label: 'Options',
			fields: [
				'shadow',
				'clickAction',
				'clickActionLinkArea',
				'animeWidgets',
				'gradientColorTop',
				'gradientColorBottom',
				'clickActionBottom'
			]
		}
  ],
	// Filter what is loaded from piece
	filters: {
		projection: {
			attachment: 1,
			title: 1,
			description: 1,
			credit: 1,
			creditUrl: 1,
			camera: 1,
			captureDate: 1,
			published: 1
		}
	},
	// Add lean and always materialize initialization with parameters
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
