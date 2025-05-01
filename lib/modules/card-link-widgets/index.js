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
						'titleColor'
					]
				}
			]
		},
		{
			name: 'elementsAlign',
			type: 'select',
			label: 'Align Elements',
			help: 'Choose align for title and link button',
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
			name: 'elementsBackgroundColor',
			type: 'color',
			label: 'Background Color for Title and Link',
			help: 'Choose a color as background for image title and link'
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
			name: 'options',
			label: 'Options',
			fields: [
				'titleDisplay',
				'titleColor',
				'linkArea',
				'elementsBackgroundColor',
				'elementsAlign',
				'shadow'
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
