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
    },
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Element Shadow',
      help: 'Choose page elements have shadow. (default: Yes)',
      def: true
    }
	],
  arrangeFields: [
    {
      name: 'options',
      label: 'Options',
      fields: [
        'tableHeaders',
        'ajaxAppend',
        'shadow',
        'hideContactButton',
        'shadow',
        'buttonText',
        'withTags',
        '_ordering'
      ]
    }
  ]
};
