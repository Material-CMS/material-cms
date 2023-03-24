module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'tables-pages',
  label: 'Tables',
  perPage: 3,
  addFields: [
    {
      name: 'ajaxAppend',
      type: 'boolean',
      label: 'Activate Ajax Append Mode',
      help: 'Activate the ajax append mode which allows to create infinite scroll layouts (default: No)',
      def: false
    },
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
      name: 'backgroundColor',
      type: 'color',
      label: 'Section Color',
      help: 'Choose a individual section background color. (default: Background color)'
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
      name: 'colors',
      label: 'Colors',
      fields: ['backgroundColor']
    },
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
