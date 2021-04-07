module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'tables-pages',
  label: 'Tables',
  perPage: 3,
  addFields: [
    {
      name: 'tableHeaders',
      type: 'array',
      label: 'Table Headers',
      help: 'Choose table headers.',
      titleField: 'text',
      schema: [
        {
          name: 'text',
          type: 'string',
          label: 'Header Name'
        },
      ]
    }
	],
  arrangeFields: [
    {
      name: 'options',
      label: 'Options',
      fields: [
        'tableHeaders',
        'hideContactButton',
        'hideFooter',
        'shadow',
        'withTags',
        '_ordering'
      ]
    }
  ]
};
