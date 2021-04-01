module.exports = {
	beforeConstruct: function(self, options) {
		options.addFields = [
			{
				name: 'revealText',
				type: 'area',
				label: 'Reveal Text',
				htmlHelp: 'Add more text which is revealed when you click on the image description.' + '<br />' + '<br />' +
				'<span>description needed to show up</span>' + '<br />' +
				'<span>will not display in gallery</span>',
				options: {
					widgets: {
						'apostrophe-rich-text': {
							toolbar: [
								'Styles',
								'Bold',
								'Italic',
								'Blockquote',
								'BulletedList',
								'Link'
							],
							styles: [
								{ name: 'Default', element: 'p' },
	              { name: 'Default Centered', element: 'p', styles: { 'text-align': 'center'} },
	              { name: 'Flow Text', element: 'p', attributes: { class: 'flow-text' } },
	              { name: 'Flow Text Centered', element: 'p', attributes: { class: 'flow-text' }, styles: { 'text-align': 'center'} },
	              { name: 'H4', element: 'h4', attributes: { class: 'accent-color' } },
	              { name: 'H4 Centered', element: 'h4', attributes: { class: 'accent-color' }, styles: { 'text-align': 'center'} }
							],
							controls: {
								movable: true,
								cloneable: false,
								removable: true,
								position: 'top-right'
							}
						}
					}
				}
			}
    ].concat(options.addFields || []);

		options.arrangeFields = [
			{
				name: 'basics',
				label: 'Basics',
				fields: ['attachment', 'title', 'description']
			},
			{
				name: 'info',
				label: 'Info',
				fields: ['revealText', 'credit', 'creditUrl', 'camera', 'captureDate', 'slug', 'tags', 'published']
			}
    ];
	}
};
