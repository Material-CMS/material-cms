module.exports = {
	beforeConstruct: function(self, options) {
		options.addFields = [
			{
				name: 'revealText',
				type: 'area',
				label: 'Reveal Text',
				help: 'Add more text which is revealed when you click on the description',
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
				name: 'titleColor',
				label: 'Title Color',
				type: 'color',
				help: 'Remove to set title to Accent Color'
      },
			{
				name: 'descriptionColor',
				label: 'descriptionColor Color',
				type: 'color',
				help: 'Remove to set description to Accent Color'
      },
			{
				type: 'select',
				name: 'align',
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
      }
    ].concat(options.addFields || []);

		options.arrangeFields = [
			{
				name: 'basics',
				label: 'Basics',
				fields: ['attachment', 'title', 'description','credit', 'creditUrl']
			},
			{
				name: 'colors',
				label: 'Colors',
				fields: ['titleColor', 'descriptionColor']
			},
			{
				name: 'options',
				label: 'Options',
				fields: ['align']
			},
			{
				name: 'info',
				label: 'Info',
				fields: ['camera', 'captureDate', 'slug', 'tags', 'published']
			}
    ];
	}
};
