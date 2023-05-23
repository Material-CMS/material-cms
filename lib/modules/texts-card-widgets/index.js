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
			name: 'clickAction',
			type: 'select',
			label: 'Images Click Action',
			htmlHelp: 'Choose click action for image (eather open image in lightbox or open an link, default: lightbox).' + '<br />' + '<br />' +
			'Lightbox: opens fullscreen image in lightbox plugin on click' + '<br />' + '<br />' +
			'Link: jumps to page anchor or external page and shows gradient overlay on over',
			choices: [
				{
					label: 'Off',
					value: false,
					def: true
				},
				{
					label: 'Lightbox',
					value: 'clickActionLightbox'
				}
			]
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
