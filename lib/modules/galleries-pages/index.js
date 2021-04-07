module.exports = {
	extend: 'apostrophe-pieces-pages',
	name: 'galleries-pages',
	label: 'Gallery Pages',
	perPage: 2,
	arrangeFields: [
		{
			name: 'options',
			label: 'Options',
			fields: [
        'hideContactButton',
        'hideFooter',
        'shadow',
        'withTags',
        '_ordering'
      ]
		}
  ]
};
