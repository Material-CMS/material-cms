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
          value: 'left-aign',
          def: true
        },
        {
          label: 'Center',
          value: 'center-aign'
        },
        {
          label: 'Right',
          value: 'right-aign'
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
      name: 'sectionStyle',
      type: 'select',
      label: 'Section Style',
      htmlHelp: 'Choose section style.' + '<br>' + '<br>' +
      '<span>Default: Sections with widgets</span>' + '<br>' +
      '<span>Slide: Slideshow and optional widgets</span>',
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
          value: 'slide',
          showFields: [
            'shapeDividerTop'
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
      name: 'backgroundImageParallax',
      type: 'select',
      label: 'Background Image Parallax',
      help: 'Activate to show backround image with parallax effect. (default: Yes)',
      choices: [
        {
          label: 'Yes',
          value: true,
          def: true,
          showFields: [
            'shapeDividerTop'
          ]
        },
        {
          label: 'No',
          value: false
        }
      ]
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
      label: 'Parallax Background Shape Divier',
      type: 'area',
      htmlHelp: 'Coose a shape divider which will be shown at section top.' + '<br>' + '<br>' +
      '<span>This is only useful if you have a parallax background image for your section. It will be shown at the bottom of parallax background image.</span>',
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
        'glueWidgets',
        'headerAdditionalFont',
        'sectionStyle'
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
