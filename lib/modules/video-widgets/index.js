module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Video Widget',
	addFields: [
		{
			name: 'title',
			type: 'string',
			labe: 'Widget Title',
			help: 'Set title for widget.'
    },
		{
			name: 'titleColor',
			type: 'color',
			labe: 'Widget Title Color',
			help: 'Set color for widget title.'
    },
		{
			name: 'apostropheVideo',
			type: 'area',
			label: 'YouTube Video',
			help: 'Link an external video like YouTube with oembed.',
			options: {
				limit: 1,
				widgets: {
					'apostrophe-video': {
						controls: {
							movable: false,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					}
				}
			}
    },
		{
			name: 'credit',
			type: 'string',
			labe: 'Widget Title',
			help: 'Set title for widget.'
    },
		{
			name: 'creditUrl',
			type: 'string',
			labe: 'Widget Title',
			help: 'Set title for widget.'
    },
  ],
	arrangeFields: [
		{
			name: 'basics',
			label: 'Basics',
			fields: ['apostropheVideo']
    },
		{
			name: 'options',
			label: 'Options',
			fields: ['title', 'titleColor']
    }
  ]
};
