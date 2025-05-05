module.exports = {
  extend: 'apostrophe-pieces',
  name: 'section',
  label: 'Section',
  pluralLabel: 'Sections',
  contextualOnly: false,
  seo: false,
  openGraph: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Section Title',
      help: 'Choose title for section.',
      required: true
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
          value: 'left-align',
          def: true
        },
        {
          label: 'Center',
          value: 'center-align'
        },
        {
          label: 'Right',
          value: 'right-align'
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
      name: 'headerAdditionalFont',
      type: 'boolean',
      label: 'Header Additional Font',
      help: 'Use additional font for header. (Add one in global before)'
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
      name: 'sectionSlide',
      type: 'boolean',
      label: 'Section Slide',
      help: 'Activate fullscrenn slider for section',
      def: false
    },
    {
      name: 'sectionMinHeight',
      label: 'Section Height Fullscreen',
      type: 'boolean',
      help: 'Set height of Section to fullscreen (default: Yes).',
      def: true
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
      name: 'backgroundImagePosition',
      type: 'select',
      label: 'Background Image Position',
      help: 'Choose background image position on page. (left, center, right)',
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
      name: 'backgroundImageParallax',
      type: 'boolean',
      label: 'Background Image Parallax',
      help: 'Activate to show backround image with parallax effect. (default: Yes)',
      def: false
    },
    {
      name: 'shapeDividerBottom',
      label: 'Bottom Shape Divier',
      type: 'area',
      htmlHelp: 'Coose a shape divider which will be shown at section bottom.'+ '<br>' +
      'Overlaps with the next section to create transition effect.',
      options: {
        widgets: {
          'shape-divider-path': {
            controls: {
              cloneable: false
            }
          },
          'shape-divider-file': {
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
        'header',
        'headerAlign'
      ]
    },
    {
      name: 'images',
      label: 'Images',
      fields: [
        '_backgroundImage',
        'backgroundImagePosition',
        'backgroundImageParallax'
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
      name: 'shape',
      label: 'Shape Divider',
      fields: [
        'shapeDividerBottom',
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'container',
        'glueWidgets',
        'headerAdditionalFont',
        'sectionSlide',
        'sectionMinHeight'
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
