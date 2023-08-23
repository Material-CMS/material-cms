module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Iframe Widget',
	addFields: [
		{
      name: 'iframeSrc',
      type: 'string',
      label: 'Iframe Src',
      help: 'Iframe src tag'
    },
		{
			name: 'iframeAllow',
			type: 'string',
			label: 'Iframe Allow',
			help: 'Iframe allow tag'
		},
		{
			name: 'blockInteraction',
			label: 'Block Interaction',
			type: 'boolean',
			help: 'Blocks pointer events if you want to block interactions with the iframe content. (default: No)',
		},
		{
			name: 'shadow',
			type: 'boolean',
			label: 'Element Shadow',
			help: 'Choose if the image widget should have a shadow. (default: Yes)',
			def: true
		}
  ],
	arrangeFields: [
		{
			name: 'basics',
			label: 'Basics',
			fields: [
				'iframeSrc',
				'iframeAllow'
			]
    },
		{
			name: 'options',
			label: 'Options',
			fields: [
				'blockInteraction',
				'shadow'
			]
		}
  ]
};
