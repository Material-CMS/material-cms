module.exports = {
	extend: 'apostrophe-images-widgets',
	piecesModuleName: 'apostrophe-images',
	label: 'Image Widget',
	addFields: [
		{
			name: 'title',
			type: 'boolean',
			label: 'Show Image Titles',
      help: 'Choose to show the titles of image or multiple images in slideshow'
    },
		{
			name: 'titleColor',
			type: 'color',
			label: 'Color Of Image Titles',
			help: 'Override image title color'
    },
		{
			name: 'descriptionColor',
			type: 'color',
			label: 'Color Of Image Descriptions',
			help: 'Override image description color'
    }
  ],
	arrangeFields: [
		{
			name: 'images',
			label: 'Images',
			fields: [ '_pieces' ]
		},
		{
			name: 'imageOptions',
			label: 'Options',
			fields: [ 'title', 'titleColor', 'descriptionColor' ]
		}
  ]
};
