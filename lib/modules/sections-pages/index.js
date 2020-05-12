module.exports = {
  name: 'sections-pages',
  label: 'Sections Page',
  extend: 'apostrophe-pieces-pages',
  arrangeFields:[
    {
      name: 'options',
      label: 'Options',
      fields: ['withTags', '_ordering', 'buttonOn', 'links']
    },
  ]
};
