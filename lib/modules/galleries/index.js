module.exports = {
	extend: 'apostrophe-pieces',
	name: 'gallery',
	label: 'Gallery',
	pluralLabel: 'Galleries',
	addFields: [
		{
			name: 'title',
			label: 'Gallery Title',
			type: 'string',
			help: 'This title is the first Cloumn of the gallery',
    },
		{
			name: 'titleShow',
			type: 'select',
			label: 'Gallery Title',
			help: 'Show gallery title inside card (default: No)',
			choices: [
				{
					label: 'No',
					value: false,
					def: true
				},
				{
					label: 'Yes',
					value: true,
					showFields: ['titleCenter', 'titleColor']
				}
			]
		},
		{
			name: 'titleCenter',
			type: 'boolean',
			label: 'Title Center',
			help: 'Choose to center title (works on desktop only! tile is always centered on mobile)'
    },
		{
			name: 'titleColor',
			type: 'color',
			label: 'Title Color',
			help: 'Remove to set gallery header to accent color'
    },
		{
			name: 'imagesTitleShow',
			type: 'select',
			label: 'Titles of Images',
			help: 'Activate to show image title inside image (default: No)',
			choices: [
				{
					label: 'No',
					value: false,
					def: true
        },
				{
					label: 'Yes',
					value: true,
					showFields: ['imagesTitleCenter', 'imagesTitleColor']
        }
      ]
    },
		{
			name: 'imagesTitleCenter',
			type: 'boolean',
			label: 'Center Titles of Images',
			help: 'Center titles of images (default: left)'
    },
		{
			name: 'imagesTitleColor',
			type: 'color',
			label: 'Images Title Color',
			help: 'Remove to set titles of images to accent color'
    },
		{
			name: 'imagesShadow',
			type: 'boolean',
			label: 'Shadow for Images Cards',
			help: 'Activate shadow for every image (default: Yes)',
			def: true
		},
		{
			name: 'imagesKlick',
			type: 'select',
			label: 'Images Klick',
			help: 'Choose klick action for images (eather open image lightbox or link, default: lightbox)',
			choices: [
				{
					label: 'Lightbox',
					value: 'lightbox',
					def: true
				},
				{
					label: 'Link',
					value: 'link'
				}
			]
		},
		{
			name: 'backColor',
			label: 'Background Color',
			type: 'color',
			help: 'Remove to set Background to Main Color'
    },
		{
			name: 'container',
			type: 'select',
			label: 'Gallery Container',
			help: 'Put gallery in container (deactivate this for full width widgets, default: Yes)',
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
			help: 'Make gallery container to material card (default: No)',
			def: false
    },
		{
			name: 'columnCount',
			type: 'select',
			label: 'Gallery Column Count',
			help: 'Choose column count on desktop (mobile: full-width)',
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
			help: 'Choose images for gallery',
			required: true,
			limit: 48,
			noHeight: true,
			filters: {
				projection: {
					attachment: 1,
					description: 1,
					title: 1,
					credit: 1,
					creditUrl: 1
				}
			}
    }
  ],
	arrangeFields: [
		{
			name: 'basics',
			label: 'Basics',
			fields: ['title', '_images', 'columnCount', 'titleShow', 'titleCenter']
  	},
		{
			name: 'colors',
			label: 'Colors',
			fields: ['titleColor', 'backColor', 'imagesTitleColor']
  	},
		{
			name: 'options',
			label: 'Images Options',
			fields: ['imagesShadow', 'imagesTitleShow', 'imagesTitleCenter','imagesKlick','imageUrl']
		},
		{
			name: 'special',
			label: 'Gallery Options',
			fields: ['container', 'card']
  	},
		{
			name: 'info',
			label: 'Info',
			fields: ['slug', 'tags', 'published']
  	}
  ]
};
