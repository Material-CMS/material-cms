module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'people-pages',
  label: 'People Page',
  perPage: 10,
  arrangeFields: [
    {
      name: 'options',
      label: 'Options',
      fields: ['withTags', '_ordering', 'hideContactButton', 'shadow', 'links']
    },
  ]
};
