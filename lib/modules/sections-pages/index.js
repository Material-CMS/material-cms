module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'sections-pages',
  label: 'Sections Page',
  perPage: 2,
  arrangeFields:[
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
