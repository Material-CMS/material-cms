module.exports = {
  extend: 'apostrophe-pieces',
  name: 'text',
  label: 'Text',
  pluralLabel: 'Texts',
  contextualOnly: false,
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Remove Title if you want text widget without header'
    },
    {
      name: 'color',
      label: 'Title Color',
      type: 'color',
      help: 'Remove to set title to accent color again'
    },
    {
      name: 'text',
      label: 'Text',
      type: 'string',
      help: 'Add Text',
      textarea: true
    },
    {
      name: '_image',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Image',
      help: 'Add horizontal image to text',
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
    { name: 'basics', label: 'Basics', fields: ['title', 'slug', 'text', '_image'] }
  ]
};
