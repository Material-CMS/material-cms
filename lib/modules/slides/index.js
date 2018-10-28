module.exports = {
  extend: 'apostrophe-pieces',
  name: 'slider',
  label: 'Slider',
  pluralLabel: 'Slides',
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
      name: 'slogan',
      label: 'Slogan',
      type: 'string',
      help: 'Add Slogan',
      textarea: true
    },
    {
      type: 'select',
      name: 'caption',
      label: 'Select Title Animation',
      choices: [
        {
          label: 'Center align',
          value: 'center-align',
        },
        {
          label: 'Left Align',
          value: 'left-align'
        },
        {
          label: 'Right Align',
          value: 'right-align'
        }
      ]
    },

    // Backgrounds
    {
      name: '_image',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Slide Image',
      help: 'Select Slide Image',
      required: true,
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
    { name: 'basics', label: 'Basics', fields: ['title', 'titleColor', 'slogan', '_image'] }
  ]

};
