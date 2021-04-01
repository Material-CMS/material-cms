module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'texts-pages',
  label: 'Texts Pages',
  perPage: 10,
  arrangeFields: [
    {
      name: 'options',
      label: 'Options',
      fields: ['withTags', '_ordering', 'hideContactButton', 'shadow', 'links']
    },
  ]
};
