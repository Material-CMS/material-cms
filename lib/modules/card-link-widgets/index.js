module.exports = {
	extend: 'apostrophe-images-widgets',
	piecesModuleName: 'apostrophe-images',
	label: 'Image Link Widget',
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
						'titleBackgroundColor'
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
			name: 'titleBackgroundColor',
			type: 'color',
			label: 'Image Title Background Color',
			help: 'Choose a color as background for image title'
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
			name: 'linkArea',
			label: 'Link Area',
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
			name: 'linkButton',
			type: 'boolean',
			label: 'Link Button',
			help: 'Add Action button to click on link inside image instead of making the whole image clickable. (default: No)',
			def: false
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
				'titleColor',
				'titleBackgroundColor'
			]
		},
		{
			name: 'imageOptions',
			label: 'Options',
			fields: [
				'shadow',
				'linkArea',
				'gradientColorTop',
				'gradientColorBottom'
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
	}
};
