module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Iframe Widget',
	addFields: [
		{
      name: 'iframeSrc',
      type: 'string',
      label: 'Iframe Src',
      help: 'Iframe src tag',
			required: true
    },
		{
			name: 'iframeTitle',
			type: 'string',
			label: 'Iframe Title',
			help: 'Choose a title for the iframe',
			required: true
		},
		{
			name: 'additionalAttributes',
			label: 'Additional Attributes',
			type: 'array',
			help: 'Add additional attributes to your html iframe element.',
			schema: [
				{
					name: 'attribute',
					type: 'string',
					label: 'Attribute',
					help: 'DONT USE QUOTATION MARKS FOR ATTRIBUTES! Example: loading=lazy)'
				}
			]
		},
		{
			name: '_previewImage',
			type: 'joinByOne',
			withType: 'apostrophe-image',
			label: 'Iframe Preview Image',
			help: 'Choose a preview image in the case you are embedding an video',
			filters: {
				projection: {
					attachment: true,
					description: true,
					title: true
				}
			}
		},
		{
			name: 'previewImageHideTimer',
		  type: 'range',
		  label: 'Preview Image Hide Timer',
			help: 'Choose at which time the priewie image fades after the iframe is loaded. (default: 500)',
		  min: 100,
		  max: 5000,
		  step: 100,
			def: 500
		},
		{
			name: 'blockInteraction',
			type: 'boolean',
			label: 'Block Interaction',
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
				'iframeTitle',
				'iframeAllow'
			]
    },
		{
			name: 'options',
			label: 'Options',
			fields: [
				'additionalAttributes',
				'_previewImage',
				'previewImageHideTimer',
				'blockInteraction',
				'shadow'
			]
		}
  ],
  // Add lean and always scripts
  construct: function(self, options) {
		self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
