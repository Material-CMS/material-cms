module.exports = {
	extend: 'apostrophe-widgets',
	name: 'double',
	label: 'Double Widget',
	addFields: [
		// TODO add field aspectRatio
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
      name: 'widgetsWidth',
      label: 'Set Widgets With',
      type: 'range',
      help: 'Choose the width of both widget areas in percent. (Default: 50%)',
      min: 30,
      max: 50,
      step: 1,
      def: 50
    },
    {
      name: 'widgetsMargin',
      label: 'Set Widgets Margin',
      type: 'range',
      help: 'Set the distance between both widgets in rem. (Default: 3)',
      min: 0,
      max: 10,
      step: 0.5,
      def: 1.5
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
