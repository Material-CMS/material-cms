module.exports = {
	extend: 'apostrophe-images-widgets',
	piecesModuleName: 'apostrophe-images',
	label: 'Image Widget',
	addFields: [
		{
			name: 'titleDisplay',
			type: 'select',
			label: 'Show Image Title',
			help: 'Choose to show or hide image title (default: No)',
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
			htmlHelp: 'Choose click action for images (eather open image in lightbox or open an link, default: lightbox).' + '<br />' + '<br />' +
			'Lightbox: opens fullscreen image in lightbox plugin on click' + '<br />' + '<br />' +
			'Link: jumps to page anchor or external page and shows gradient overlay on over',
			choices: [
				{
					label: 'Lightbox',
					value: 'clickActionLightbox',
					def: true
				},
				{
					label: 'Link',
					value: 'clickActionLink',
					showFields: [
						'clickActionLinkArea',
						'gradientColorTop',
						'gradientColorBottom'
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
		}
  ],
	arrangeFields: [
		{
			name: 'images',
			label: 'Images',
			fields: [ '_pieces' ]
		},
		{
			name: 'colors',
			label: 'Colors',
			fields: [ 'titleColor', 'gradientColorTop', 'gradientColorBottom' ]
		},
		{
			name: 'imageOptions',
			label: 'Options',
			fields: ['title', 'titleDisplay', 'titleAlign', 'clickAction', 'clickActionLinkArea']
		}
  ],
	filters: {
		projection: {
			attachment: 1,
			title: 1,
			description: 1,
			revealText: 1,
			credit: 1,
			creditUrl: 1,
			camera: 1,
			captureDate: 1,
			slug: 1,
			tags: 1,
			published: 1
		}
	}
};
