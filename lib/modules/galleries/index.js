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
      help: 'This title is the first Cloumn of the gallery',
    },
    {
      name: 'headerColor',
      type: 'color',
      label: 'Title Color',
      help: 'Remove to set gallery header to accent color'
    },
    {
      name: 'headerCenter',
      type: 'boolean',
      label: 'Title Center',
      help: 'Choose to center title'
    },
    {
      name: 'columnCount',
      type: 'select',
      label: 'Column Count',
      help: 'Choose how many columns the gallery should have ( mobile layout is excluded! )',
      choices: [
        {
          label: 'Five',
          value: '5',
          def: true
        },
        {
          label: 'Four',
          value: '4'
        },
        {
          label: 'Three',
          value: '3'
        }
      ]
    },
    {
      name: '_images',
      type: 'joinByArray',
      withType: 'apostrophe-image',
      label: 'Images',
      help: 'Choose images for gallery',
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
    { name: 'options', label: 'Options', fields: [ 'columnCount', 'headerColor', 'headerCenter' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] }
  ],
};
