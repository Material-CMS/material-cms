module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'people-pages',
  label: 'People Page',
  perPage: 10,
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
