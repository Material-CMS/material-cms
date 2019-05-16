module.exports = {
  extend: 'apostrophe-pieces',
  name: 'section',
  label: 'Section',
  pluralLabel: 'Sections',
  contextualOnly: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Section Title',
      help: 'Select Title'
    },
    {
      name: 'headerColor',
      type: 'color',
      label: 'Title Color',
      help: 'Remove to set title on accent color again'
    },
    {
      name: 'color',
      type: 'color',
      label: 'Section Color',
      help: 'Remove to set section on accent color again'
    },
    {
      name: 'headerOn',
      type: 'boolean',
      label: 'Section Header',
      help: 'A header that displays the title of this section'
    },
    {
      name: 'containerOn',
      type: 'boolean',
      label: 'Widgets in Container On',
      help: 'Put widgets in container deactivate for full width widgets',
      def: true
    },
    {
      name: 'cardOn',
      type: 'boolean',
      label: 'Material Card Container',
      help: 'Make whole widgets container to material card',
      def: false
    },
    {
      name: 'preferences',
      type: 'select',
      label: 'Section Options',
      help: 'Choose Section Style',
      choices: [
        {
          label: 'Default',
          value: 'default',
          showFields: [ 'headerOn' ]
        },
        {
          label: 'Slide',
          value: 'slideOn'
        },
        {
          label: 'Footer',
          value: 'footerOn'
        }
      ]
    },
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
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: [ 'title', '_image' ] },
    { name: 'colors', label: 'Colors', fields: [ 'headerColor', 'color' ] },
    { name: 'settings', label: 'Settings', fields: [ 'preferences' ,'headerOn', 'containerOn', 'cardOn' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] },
  ]
};
