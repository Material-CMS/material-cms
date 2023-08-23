module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Video Widget',
	addFields: [
		{
			name: 'videoSource',
			type: 'select',
			label: 'Choose Video Source',
			htmlHelp: 'Choose video source eather external or local. (default: Yes)' + '<br>' + '<br>' +
			'<span>It is recommended to use videos from external sources. The advantages of technical nature and reach are obvious.</span>',
			choices: [
				{
					label: 'External Video',
					value: 'extern',
					def: true,
					showFields: [
						'apostropheVideo'
					]
				},
				{
					label: 'Local Video',
					value: 'local',
					showFields: [
						'filename',
						'_poster'
					]
				}
			]
		},
		{
				name: 'apostropheVideo',
				type: 'singleton',
				label: 'Video URL',
				help: 'Link an external video like YouTube with oembed.',
				widgetType: 'apostrophe-video',
				options: {
					limit:1
				}
		},
		{
				name: 'filename',
				label: 'File',
				type: 'singleton',
				widgetType: 'apostrophe-files',
				options: {
					limit:1
				}
		},
		{
			name: '_poster',
			type: 'joinByOne',
			withType: 'apostrophe-image',
			label: 'Poster Picture',
			help: 'Choose poster picture',
			filters: {
				projection: {
					attachment: true,
					description: true,
					title: true
				}
			}
		},
		{
			name: 'shadow',
			type: 'boolean',
			label: 'Element Shadow',
			help: 'Choose if the image widget should have a shadow. (default: Yes)',
			def: true
		},
  ],
	arrangeFields: [
		{
			name: 'basics',
			label: 'Basics',
			fields: [
				'videoSource',
				'apostropheVideo',
				'filename',
				'_poster'
			]
    },
		{
			name: 'options',
			label: 'Options',
			fields: [
				'shadow'
			]
		}
  ]
};
