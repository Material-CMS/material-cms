module.exports = {
  extend: 'apostrophe-pieces',
  name: 'section',
  label: 'Section',
  pluralLabel: 'Sections',
  contextualOnly: false,
  seo: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Section Title',
      help: 'Choose title for section'
    },
    {
      name: 'titleColor',
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
      name: 'titleOn',
      type: 'boolean',
      label: 'Section Title On',
      help: 'Show title of section'
    },
    {
      name: 'container',
      type: 'select',
      label: 'Widgets Container On',
      help: 'Put widgets in container deactivate this for full width widgets',
      choices: [
        {
          label: 'Yes',
          value: 'on',
          def: true
        },
        {
          label: 'No',
          value: 'off'
        }
      ]
    },
    {
      name: 'glueWidgets',
      type: 'boolean',
      label: 'Glue Widget',
      help: 'Glue widgets together',
      def: false
    },
    {
      name: 'preferences',
      type: 'select',
      label: 'Section Options',
      help: 'Choose section style',
      choices: [
        {
          label: 'Default',
          value: 'default',
          showFields: [ 'titleOn', 'titleColor', 'container', '_sideImage', 'sideImageRight' ]
        },
        {
          label: 'Slide',
          value: 'slideOn'
        },
        {
          label: 'Footer',
          value: 'footerOn',
          showFields: [ 'smallFooter', 'titleOn', 'titleColor', 'container', '_sideImage', 'sideImageRight' ]
        }
      ]
    },
    {
      name: '_image',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Image',
      help: 'Choose background for section',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    },
    {
      name: '_sideImage',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Side Image',
      help: 'Choose a small side image for section',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    },
    {
      name: 'sideImageRight',
      type: 'boolean',
      label: 'Side Image Right',
      help: 'Move side image to the right, by default side image is on the left'
    },
    {
      name: 'smallFooter',
      type: 'boolean',
      label: 'Set Small Footer',
      help: 'Activate Small Copyright and Legal Bar in Footer'
    }
  ],
  arrangeFields: [
    {
      name: 'section',
      label: 'Section',
      fields: [ 'title', 'preferences' ]
    },
    {
      name: 'images',
      label: 'Images',
      fields: [ '_image', '_sideImage', 'sideImageRight' ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [ 'smallFooter', 'container', 'glueWidgets', 'titleOn', 'titleColor', 'color' ]
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ]
};
