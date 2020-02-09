module.exports = {
  name: 'sections-pages',
  label: 'Sections Page',
  extend: 'apostrophe-pieces-pages',
  perPage: 10,
  arrangeFields: [
    { name: 'options', label: 'Options', fields: [ 'withTags', 'buttonOn', 'links' ] },
  ],
};
