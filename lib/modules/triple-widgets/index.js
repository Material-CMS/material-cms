module.exports = {
	extend: 'apostrophe-widgets',
	name: 'triple',
	label: 'Triple Widget',
	addFields: [
		{
			name: 'widgetsOne',
			type: 'area',
      contextual: true
		},
		{
			name: 'widgetsTwo',
			type: 'area',
			contextual: true
		},
		{
			name: 'widgetsThree',
			type: 'area',
      contextual: true
		}
  ]
};
