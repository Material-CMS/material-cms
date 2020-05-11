module.exports = {
  name: 'sections-infinite-pages',
  piecesModuleName: 'sections',
  label: 'Infinite Sections Page',
  extend: 'apostrophe-pieces-pages',
  perPage: 1,
  arrangeFields:[
    {
      name: 'options',
      label: 'Options',
      fields: ['withTags', '_ordering', 'buttonOn', 'links']
    }
  ]
};
