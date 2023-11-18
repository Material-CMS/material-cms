module.exports = {
	extend: 'apostrophe-images-widgets',
	piecesModuleName: 'apostrophe-images',
	label: 'Image Anime Widget',
	defer: true,
	addFields: [
		{
			name: 'shadow',
			type: 'boolean',
			label: 'Element Shadow',
			help: 'Choose if the image widget should have a shadow. (default: Yes)',
			def: true
		},
		{
			name: 'titleDisplay',
			type: 'select',
			label: 'Show Image Title',
			help: 'Choose whether to display the title of the image. (default: No)',
			choices: [
				{
					label: 'No',
					value: false,
					def: true
				},
				{
					label: 'Yes',
					value: true,
					showFields: [
						'titleAlign',
						'titleColor',
						'titleBackgroundColor'
					]
				}
			]
		},
		{
			name: 'titleAlign',
			type: 'select',
			label: 'Title Align',
			help: 'Choose align for title and description (either center, left or right)',
			choices: [
				{
					label: 'Center align',
					value: 'center-align',
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
			type: 'color',
			label: 'Image Title Color',
			help: 'Choose a color for image title'
		},
		{
			name: 'titleBackgroundColor',
			type: 'color',
			label: 'Image Title Background Color',
			help: 'Choose a color as background for image title'
		},
		{
			name: 'animeWidgets',
			type: 'area',
			contextual: true
		},
		{
			name: 'doubleColumns',
			type: 'select',
			label: 'Double Columns',
			help: 'Activate for double Columns in widget area',
			choices: [
				{
					label: 'No',
					value: false,
					def: true
				},
				{
					label: 'Yes',
					value: true,
					showFields: [
						'animeWidgetsDoubleColumns'
					]
				}
			]
		},
		{
			name: 'animeWidgetsDoubleColumns',
			type: 'area',
			contextual: true
		},
		{
			name: 'overlayColor',
			label: 'Overlay Color',
			type: 'color',
			help: 'Choose the color for the background overlay'
		},
  ],
	arrangeFields: [
		{
			name: 'image',
			label: 'Image',
			fields: [
				'_pieces'
			]
		},
		{
			name: 'title',
			label: 'Title',
			fields: [
				'titleDisplay',
				'titleAlign',
				'titleColor',
				'titleBackgroundColor'
			]
		},
		{
			name: 'imageOptions',
			label: 'Options',
			fields: [
				'shadow',
				'animeWidgets',
				'overlayColor',
				'doubleColumns'
			]
		}
  ],
	filters: {
		projection: {
			attachment: 1,
			title: 1,
			description: 1,
			credit: 1,
			creditUrl: 1,
			camera: 1,
			captureDate: 1,
			published: 1
		}
	},
  construct: function(self, options) {
		self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
