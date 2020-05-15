module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'texts-pages',
  label: 'Blog',
  perPage: 10,
  arrangeFields: [
    {
      name: 'options',
      label: 'Options',
      fields: ['withTags', '_ordering', 'buttonOn', 'shadow', 'links']
    },
  ]
};
