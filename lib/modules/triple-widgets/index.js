module.exports = {
	extend: 'apostrophe-widgets',
	name: 'triple',
	label: 'Triple Widget',
	contextualOnly: true,
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
