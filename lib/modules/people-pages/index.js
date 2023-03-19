module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'people-pages',
  label: 'People Page',
  perPage: 10,
  addFields: [
    {
      name: 'ajaxAppend',
      type: 'boolean',
      label: 'Activate Ajax Append Mode',
      help: 'Activate the ajax append mode which allows to create infinite scroll layouts (default: No)',
      def: false
    },
    {
      name: 'buttonText',
      type: 'string',
      label: 'Load More or Next button Text',
      help: 'Define text for the button on the end of the page which is eather \'Load More\' or \'Next Page\' depending of Ajax Append Mode (default: \'Load More\')',
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
        'ajaxAppend',
        'shadow',
        'hideContactButton',
        'shadow',
        'buttonText',
        'withTags',
        '_ordering'
      ]
    },
  ]
};
