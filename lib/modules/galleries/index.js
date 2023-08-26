module.exports = {
	extend: 'apostrophe-pieces',
	name: 'gallery',
	label: 'Gallery',
	pluralLabel: 'Galleries',
	slugPrefix: 'gallery-',
	seo: false,
	openGraph: false,
	addFields: [
		{
			name: 'title',
			label: 'Gallery Title',
			type: 'string',
			help: 'This title is the first column of the gallery.',
    },
		{
			name: 'titleDisplay',
			type: 'select',
			label: 'Gallery Title',
			help: 'Show gallery title inside card. (Default: No)',
			choices: [
				{
					label: 'No',
					value: false,
					def: true
				},
				{
					label: 'Yes',
					value: true,
					showFields: ['titleAlign', 'titleColor']
				}
			]
		},
		{
			name: 'titleAlign',
			type: 'select',
			label: 'Gallery Title Align',
			help: 'Choose align for gallery title, ether center, left or right. (Default: Center Align)',
			choices: [
				{
					label: 'Center Align',
					value: 'center-align',
					def: true
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
			label: 'Title Color',
			help: 'Remove to set gallery header to accent color.'
    },
		{
			name: 'imagesShadow',
			type: 'boolean',
			label: 'Shadow for Images Cards',
			help: 'Activate shadow for every image. (default: Yes)',
			def: true
		},
		{
			name: 'backColor',
			label: 'Background Color',
			type: 'color',
			help: 'Remove to set background to main color.'
    },
		{
			name: 'columnCount',
			type: 'select',
			label: 'Gallery Column Count',
			htmlHelp: 'Choose column count' + '<br />' + '<br />' +
			'Five and Four are responsive, so they scale up and down on mobile and big screens',
			choices: [
				{
					label: 'Five',
					value: '5',
        },
				{
					label: 'Four',
					value: '4'
        },
				{
					label: 'Three',
					value: '3',
					def: true
        },
				{
					label: 'Two',
					value: '2'
				}
      ]
    },
		{
			name: '_images',
			type: 'joinByArray',
			withType: 'apostrophe-image',
			label: 'Images',
			help: 'Add images to gallery',
			required: true,
			limit: 48,
			noHeight: true,
			filters: {
				projection: {
					attachment: 1,
					description: 1,
					title: 1,
					titleShow: 1,
					titleColor: 1,
					titleAlign: 1,
					credit: 1,
					creditUrl: 1
				}
			}
    },
		{
      name: 'forceAspectRatio',
      type: 'boolean',
      label: 'Force Aspect Ratio',
      help: 'Force aspect ratio 1:1 for all Images. (default: No)',
      def: false
    },
		{
			name: 'lightboxOn',
			type: 'boolean',
			label: 'Open Image Ligtbox',
			help: 'Open images in a fulscreen lightbox when clicked. (default: Yes)',
			def: true
		}
  ],
	// Fields Arrangement
	arrangeFields: [
		{
			name: 'basics',
			label: 'Basics',
			fields: [
				'title',
				'columnCount',
				'_images'
			]
  	},
		{
			name: 'colors',
			label: 'Colors',
			fields: [
				'titleColor',
				'backColor'
			]
  	},
		{
			name: 'options',
			label: 'Options',
			fields: [
				'titleDisplay',
				'titleAlign',
				'container',
				'card',
				'imagesShadow',
				'forceAspectRatio',
				'lightboxOn'
			]
		},
		{
			name: 'info',
			label: 'Info',
			fields: [
				'slug',
				'tags',
				'published'
			]
  	}
  ]
};
