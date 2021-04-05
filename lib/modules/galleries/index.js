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
			name: 'galleryType',
			type: 'select',
			label: 'Gallery Type',
			help: 'Choose gallery type (Default: gallery with lightbox images)',
			choices: [
				{
					label: 'Default',
					value: true,
					def: true,
					showFields: ['_images', 'forceAspectRatio']
				},
				{
					label: 'Links',
					value: 'links',
					showFields: ['linkImage']
				}
			]
		},
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
			name: 'container',
			type: 'select',
			label: 'Gallery Container',
			help: 'Put gallery in container, deactivate this for full width widgets. (default: Yes)',
			choices: [
				{
					label: 'Yes',
					value: true,
					def: true,
					showFields: ['card']
        },
				{
					label: 'No',
					value: false
        }
      ]
    },
		{
			name: 'card',
			type: 'boolean',
			label: 'Gallery Material Card',
			help: 'Make gallery container to material card. (default: No)',
			def: false
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
				},
				{
					label: 'One',
					value: '1'
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
					creditUrl: 1,
					clickAction: 1,
					gradientColorTop: 1,
					gradientColorBottom: 1,
				}
			}
    },
		{
      name: 'linkImage',
      type: 'area',
      label: 'Images with Links',
			htmlHelp: 'Add images with links to gallery.' + '<br />' + '<br />' +
			'<span>You can add a link to every image widget here,</span>' + '<br />' +
			'<span>choose "link" under widget options and add one.</span>',
      options: {
        widgets: {
          'card': {
						aspectRatio: [ 1, 1 ],
						focalPoint: true,
						noHeight: true,
						limit: 1,
						clickAction: 'link',
						controls: {
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
          }
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
			name: 'clickActionLightbox',
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
				'galleryType',
				'_images',
				'linkImage'
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
				'container',
				'card',
				'imagesShadow',
				'imagesContainerHeight',
				'forceAspectRatio',
				'clickActionLightbox',
				'titleDisplay',
				'titleAlign'
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
