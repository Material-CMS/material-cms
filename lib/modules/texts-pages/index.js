module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'texts-pages',
  label: 'Texts Pages',
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
