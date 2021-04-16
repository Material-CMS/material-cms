module.exports = {
	extend: 'apostrophe-widgets',
	name: 'double',
	label: 'Double Widget',
	addFields: [
		{
			name: 'widgetsLeft',
			type: 'area',
      contextual: true
		},
		{
			name: 'widgetsRight',
			type: 'area',
      contextual: true
		},
		{
			name: 'forceAspectRatio',
			type: 'boolean',
			label: 'Force Aspect Ratio',
			help: 'Force aspect ratio 1:1 for both widget areas. (default: No)',
			def: false
		}
  ]
};
