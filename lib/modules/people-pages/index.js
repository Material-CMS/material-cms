module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'people-pages',
  label: 'People Page',
  perPage: 10,
  addFields: [
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
        'hideContactButton',
        'hideFooter',
        'shadow',
        'withTags',
        '_ordering'
      ]
    },
  ]
};
