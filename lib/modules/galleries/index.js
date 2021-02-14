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
			help: 'Show gallery title',
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
			help: 'Show image title inside image',
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
			help: 'Activate shadow for every image',
			def: true
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
			help: 'Put gallery in container deactivate this for full width widgets',
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
			help: 'Make whole gallery container to material card',
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
			fields: ['title', '_images']
  	},
		{
			name: 'colors',
			label: 'Colors',
			fields: ['titleColor', 'backColor', 'imagesTitleColor']
  	},
		{
			name: 'options',
			label: 'Options',
			fields: ['columnCount', 'titleShow', 'container', 'card', 'titleCenter', 'imagesTitleShow', 'imagesTitleCenter', 'imagesShadow']
  	},
		{
			name: 'info',
			label: 'Info',
			fields: ['slug', 'tags', 'published']
  	}
  ]
};
