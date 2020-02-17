module.exports = {
  extend: 'apostrophe-pieces',
  name: 'gallery',
  label: 'Gallery',
  pluralLabel: 'Galleries',
  addFields: [
    {
      name: 'title',
      label: 'Carousel Title',
      type: 'string',
      help: 'This Title will not show up in carousel by default, you can change this in options',
    },
    {
      name: 'headerColor',
      type: 'color',
      label: 'Title Color',
      help: 'Remove to set Gallery Header to Accent Color'
    },
    {
      name: '_images',
      type: 'joinByArray',
      withType: 'apostrophe-image',
      label: 'Images',
      help: 'Choose Images for Gallery',
      required: true,
      limit: 24,
      noHeight: true,
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', '_images'] },
    { name: 'colors', label: 'Colors', fields: [ 'headerColor' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] }
  ]
};
