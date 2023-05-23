module.exports = {
	beforeConstruct: function(self, options) {

		options.arrangeFields = [
			{
				name: 'basics',
				label: 'Basics',
				fields: ['attachment', 'title', 'description']
			},
			{
				name: 'info',
				label: 'Info',
				fields: ['credit', 'creditUrl', 'camera', 'captureDate', 'slug', 'tags', 'published']
			}
    ];
	}
};
