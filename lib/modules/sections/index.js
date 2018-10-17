module.exports = {
  extend: 'apostrophe-pieces',
  name: 'section',
  label: 'Section',
  pluralLabel: 'Sections',
  contextualOnly: false,
  addFields: [
    // Main Fields
    {
      name: 'title',
      label: 'Section Title',
      type: 'string',
      help: 'Select Title'
    },
    {
      name: 'color',
      label: 'Section Color',
      type: 'color',
      help: 'Select color'
    },
    // Backgrounds
    {
      name: '_image',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Image',
      help: 'Choose Background for Section',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'color', '_image'] }
  ]
};
