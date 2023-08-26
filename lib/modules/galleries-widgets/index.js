module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'galleries',
  label: 'Gallery Widget',
  addFields: [
    {
      name: 'imagesTitlesDisplay',
      label: 'Display Images Titles',
      type: 'boolean',
      help: 'Choose to display or hide image titles. (Default: No)',
      def: false
    },
    {
			name: 'galleriesTitlesDisplay',
			type: 'select',
			label: 'Display Galleries Titles',
			help: 'Choose to display galleries titles. (Default: Yes)',
			choices: [
				{
					label: 'No',
					value: false
				},
				{
					label: 'Yes',
					value: true,
          def: true,
					showFields: ['galleriesTitlesAlign', 'galleriesTitlesColor']
				}
			]
		},
		{
			name: 'galleriesTitlesAlign',
			type: 'select',
			label: 'Galleries Titles Align',
			help: 'Choose center, left or right align for galleries titles. (Default: Right Align)',
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
					value: 'right-align',
          def: true
				}
			]
		},
    {
      name: 'galleriesTitlesColor',
      type: 'color',
      label: 'Galleries Titles Color',
      help: 'Remove to set gallery header to accent color.'
    },
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Galleries Shadow',
      help: 'Choose shadow for galleries. (Default: Yes)',
      def: true
    },
    {
      name: 'backColor',
      label: 'Background Color',
      type: 'color',
      help: 'Override background colors of all galleries.'
    }
  ],
  arrangeFields: [
    {
      name: 'galleries',
      label: 'Galleries',
      fields: [
        'by',
        'limitByAll',
        '_pieces',
        'tags',
        'limitByTag'
      ]
    },
    {
      name: 'colors',
      label: 'Colors',
      fields: [
        'backColor'
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'imagesTitlesDisplay',
        'galleriesTitlesDisplay',
        'galleriesTitlesAlign',
        'galleriesTitlesColor',
        'shadow'
      ]
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleDisplay: 1,
      titleAlign: 1,
      titleColor: 1,
      imagesShadow: 1,
      backColor: 1,
      columnCount: 1,
      _url: 1,
      _images: true,
      forceAspectRatio: 1,
      lightboxOn: 1
    }
  }
};
