module.exports = {
	extend: 'apostrophe-pieces',
	name: 'gallery',
	label: 'Gallery',
	pluralLabel: 'Galleries',
	slugPrefix: 'gallery-',
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
			name: 'imagesShadow',
			type: 'boolean',
			label: 'Shadow for Images Cards',
			help: 'Activate shadow for every image (default: Yes)',
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
			label: 'Options',
			fields: ['container', 'card', 'imagesShadow']
		},
		{
			name: 'info',
			label: 'Info',
			fields: ['slug', 'tags', 'published']
  	}
  ]
};
