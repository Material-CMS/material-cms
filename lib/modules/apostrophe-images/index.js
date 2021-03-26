module.exports = {
	beforeConstruct: function(self, options) {
		options.addFields = [
			{
				name: 'descriptionColor',
				label: 'descriptionColor Color',
				type: 'color',
				help: 'Remove to set description to Accent Color'
			},
			{
				name: 'revealText',
				type: 'area',
				label: 'Reveal Text',
				htmlHelp: 'Add more text which is revealed when you click on the image description.' + '<br />' + '<br />' +
				'<span>description needed to show up</span>' + '<br />' +
				'<span>will not display in gallery</span>',
				options: {
					widgets: {
						'apostrophe-rich-text': {
							toolbar: [
								'Styles',
								'Bold',
								'Italic',
								'Blockquote',
								'BulletedList',
								'Link'
							],
							styles: [
								{ name: 'Default', element: 'p' },
	              { name: 'Default Centered', element: 'p', styles: { 'text-align': 'center'} },
	              { name: 'Flow Text', element: 'p', attributes: { class: 'flow-text' } },
	              { name: 'Flow Text Centered', element: 'p', attributes: { class: 'flow-text' }, styles: { 'text-align': 'center'} },
	              { name: 'H4', element: 'h4', attributes: { class: 'accent-color' } },
	              { name: 'H4 Centered', element: 'h4', attributes: { class: 'accent-color' }, styles: { 'text-align': 'center'} }
							],
							controls: {
								movable: true,
								cloneable: false,
								removable: true,
								position: 'top-right'
							}
						}
					}
				}
			},
			{
				name: 'titleShow',
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
						showFields: ['titleCenter', 'titleColor']
					}
				]
			},
			{
				name: 'titleAlign',
				type: 'select',
				label: 'Title & Description Align',
				help: 'Choose align for title and description (either center, left or right)',
				choices: [
					{
						label: 'Center align',
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
				label: 'Title Color',
				type: 'color',
				help: 'Remove to set title to Accent Color'
      },
			{
				name: 'clickAction',
				type: 'select',
				label: 'Images Click Action',
				htmlHelp: 'Choose click action for images (eather open image in lightbox or open an link, default: lightbox).' + '<br />' + '<br />' +
				'<span>for link image must be in a gallery</span>',
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
				name: 'gradientColorTop',
				label: 'Gradient Color Top',
				type: 'color',
				htmlHelp: 'Choose the top gradient color for image overlay' + '<br />' + '<br />' +
				'<span>image must be in a gallery</span>'
			},
			{
				name: 'gradientColorBottom',
				label: 'Gradient Color Bottom',
				type: 'color',
				htmlHelp: 'Choose the Bottom gradient color for image overlay' + '<br />' + '<br />' +
				'<span>image must be in a gallery</span>'
			}
    ].concat(options.addFields || []);

		options.arrangeFields = [
			{
				name: 'basics',
				label: 'Basics',
				fields: ['attachment', 'title', 'description', 'revealText', 'titleShow']
			},
			{
				name: 'colors',
				label: 'Colors',
				fields: ['gradientColorTop', 'gradientColorBottom', 'titleColor', 'descriptionColor']
			},
			{
				name: 'options',
				label: 'Options',
				fields: ['titleAlign', 'clickAction']
			},
			{
				name: 'info',
				label: 'Info',
				fields: ['credit', 'creditUrl', 'camera', 'captureDate', 'slug', 'tags', 'published']
			}
    ];
	}
};
