module.exports = {
  extend: 'apostrophe-pieces',
  name: 'section',
  label: 'Section',
  pluralLabel: 'Sections',
  slugPrefix: 'section-',
  contextualOnly: false,
  seo: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Section Title',
      help: 'Choose title for section.'
    },
    {
      name: 'header',
      type: 'string',
      label: 'Section Header',
      help: 'Choose a optional header for section. (will be shown as h1)'
    },
    {
      name: 'headerAlign',
      type: 'select',
      label: 'Header Text Align',
      help: 'Choose header text align. (left, center, right)',
      choices: [
        {
          label: 'Left',
          value: 'left',
          def: true
        },
        {
          label: 'Center',
          value: 'center'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ]
    },
    {
      name: 'headerColor',
      type: 'color',
      label: 'Header Color',
      help: 'Choose a individual header color. (default: Accent Color)'
    },
    {
      name: 'backgroundColor',
      type: 'color',
      label: 'Section Color',
      help: 'Choose a individual section background color. (default: Background color)'
    },
    {
      name: 'container',
      type: 'boolean',
      label: 'Widgets Container',
      help: 'Put widgets in container in the middle of the page. (default: Yes)',
      def: true
    },
    {
      name: 'glueWidgets',
      type: 'boolean',
      label: 'Glue Widget',
      help: 'Glue widgets together.',
      def: false
    },
    {
      name: 'sectionStyle',
      type: 'select',
      label: 'Section Style',
      help: 'Choose section style eather either default, slide or footer.',
      choices: [
        {
          label: 'Default',
          value: 'default',
          showFields: [
            '_backgroundImage',
            'backgroundImageParallax'
          ]
        },
        {
          label: 'Slide',
          value: 'slide'
        },
        {
          label: 'Footer',
          value: 'footer',
          showFields: [
            '_backgroundImage',
            'backgroundImageParallax'
          ]
        }
      ]
    },
    {
      name: '_backgroundImage',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Background Image',
      help: 'Choose a big background image for section.',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    },
    {
      name: 'backgroundImageParallax',
      type: 'boolean',
      label: 'Background Image Parallax',
      help: 'Activate to show backround image with parallax effect. (default: Yes)',
      def: true
    },
    {
      name: '_sideImage',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Side Image',
      help: 'Choose a small side image for section.',
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
      help: 'Move side image to the right, by default side image is on the left.'
    },
    {
      name: 'shapeDividerTop',
      label: 'Top Shape Divier',
      type: 'area',
      help: 'Coose a shape divider which will be shown at section top.',
      options: {
        widgets: {
          'shape-divider-path': {
            controls: {
              cloneable: false
            }
          }
        }
      }
    },
    {
      name: 'shapeDividerBottom',
      label: 'Bottom Shape Divier',
      type: 'area',
      help: 'Coose a shape divider which will be shown at section bottom.',
      options: {
        widgets: {
          'shape-divider-path': {
            controls: {
              cloneable: false
            }
          }
        }
      }
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    {
      name: 'section',
      label: 'Section',
      fields: [
        'title',
        'sectionStyle',
        'header',
        'headerAlign'
      ]
    },
    {
      name: 'images',
      label: 'Images',
      fields: [
        '_backgroundImage',
        'backgroundImageParallax',
        '_sideImage',
        'sideImageRight'
      ]
    },
    {
      name: 'shape',
      label: 'Shape Divider',
      fields: [
        'shapeDividerTop',
        'shapeDividerBottom'
      ]
    },
    {
      name: 'colors',
      label: 'Colors',
      fields: [
        'headerColor',
        'backgroundColor'
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'container',
        'glueWidgets'
      ]
    },
    {
      name: 'info',
      label: 'Info',
      fields: [
        'slug',
        'tags',
        'published'
      ]
    }
  ]
};
