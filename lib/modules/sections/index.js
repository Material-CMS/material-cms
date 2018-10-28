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
      name: 'titleColor',
      label: 'Title Color',
      type: 'color',
      help: 'Remove to set title on accent color again'
    },
    {
      name: 'color',
      label: 'Section Color',
      type: 'color',
      help: 'Remove to set section on accent color again'
    },
    {
      name: 'preferences',
      label: 'Change to Slider',
      type: 'boolean'
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
    { name: 'basics', label: 'Basics', fields: ['title', 'titleColor', 'color', '_image'] }
  ]
};
