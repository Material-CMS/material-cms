module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'sections-pages',
  label: 'Sections Page',
  arrangeFields:[
    {
      name: 'options',
      label: 'Options',
      fields: ['withTags', '_ordering', 'buttonOn', 'shadow', 'links']
    },
  ]
};
