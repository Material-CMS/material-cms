module.exports = {
	extend: 'apostrophe-widgets',
	name: 'double',
	label: 'Double Widget',
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
		} 
	]
};
