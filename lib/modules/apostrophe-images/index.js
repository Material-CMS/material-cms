module.exports = {
	beforeConstruct: function(self, options) {
		options.addFields = [
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
