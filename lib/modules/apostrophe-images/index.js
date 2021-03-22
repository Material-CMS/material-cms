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
				help: 'Add more text which is revealed when you click on the description (DESCRIPTION NECCESARY, NOT IN GALLERY!)',
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
								{ name: 'Meta', element: 'h5', attributes: { class: 'accent-color' } },
								{ name: 'Flow Text', element: 'p', attributes: { class: 'flow-text' } },
								{ name: 'Flow Text Centered', element: 'p', attributes: { class: 'flow-text' }, styles: { 'text-align': 'center'} },
								{ name: 'Centered', element: 'p', styles: { 'text-align': 'center'} }
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
				help: 'Choose click action for images (eather open image lightbox or link, default: lightbox, ONLY FOR GALLERY!)',
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
				help: 'Choose the top gradient color for image overlay (ONLY FOR GALLERY!)'
			},
			{
				name: 'gradientColorBottom',
				label: 'Gradient Color Bottom',
				type: 'color',
				help: 'Choose the Bottom gradient color for image overlay (ONLY FOR GALLERY!)'
			}
    ].concat(options.addFields || []);

		options.arrangeFields = [
			{
				name: 'basics',
				label: 'Basics',
				fields: ['attachment', 'title', 'description', 'revealText', 'credit', 'creditUrl']
			},
			{
				name: 'colors',
				label: 'Colors',
				fields: ['titleColor', 'descriptionColor', 'gradientColorTop', 'gradientColorBottom']
			},
			{
				name: 'options',
				label: 'Options',
				fields: ['titleShow', 'titleAlign', 'titleColor', 'clickAction']
			},
			{
				name: 'info',
				label: 'Info',
				fields: ['camera', 'captureDate', 'slug', 'tags', 'published']
			}
    ];
	}
};
