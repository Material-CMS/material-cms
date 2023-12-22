module.exports = {
	extend: 'apostrophe-images-widgets',
	piecesModuleName: 'apostrophe-images',
	label: 'Image Widget',
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
			name: 'sizesAttr',
			type: 'string',
			label: 'Sizes',
			htmlHelp: 'Choose srcset sizes as string.' + '<br />' +
				'You can use media queries like: (max-width:600px) 50vw, 40vw'
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
			name: 'lightboxOn',
			type: 'select',
			label: 'Lightbox Effect Active',
			help: 'Choose lightbox effect for image. (default: Yes)',
			choices: [
				{
					label: 'Yes',
					value: true,
					def: true,
					showFields: [
						'lightboxNoCrop',
						'overlayColor'
					]
				},
				{
					label: 'No',
					value: false
				}
			]
		},
		{
			name: 'lightboxNoCrop',
			type: 'boolean',
			label: 'Lightbox No Crop',
			help: 'Choose to show the cropped image or the full image when it is shown fullscreen. (default: Yes)',
			def: true
		},
		{
			name: 'overlayColor',
			label: 'Overlay Color',
			type: 'color',
			help: 'Choose the color for the background overlay'
		},
  ],
	// Fields Arrangement
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
				'sizesAttr',
				'lightboxOn',
				'lightboxNoCrop',
				'overlayColor'
			]
		}
  ],
	// Filter what is loaded from piece
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
