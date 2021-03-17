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
      name: 'header',
      type: 'string',
      label: 'Section Header',
      help: 'Choose a optional header for section (will be shown as h1)'
    },
    {
      name: 'headerAlign',
      type: 'select',
      label: 'Header Text Align',
      help: 'Choose header text align (left, center, right)',
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
      help: 'Choose a individual header color (default: Accent Color)'
    },
    {
      name: 'color',
      type: 'color',
      label: 'Section Color',
      help: 'Choose a individual section background color (default: Background color)'
    },
    {
      name: 'container',
      type: 'boolean',
      label: 'Widgets Container',
      help: 'Put widgets in container in the middle of the page (default: Yes)',
      def: true
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
          showFields: [ 'header', 'headerAlign', 'headerColor', 'container', '_sideImage', 'sideImageRight' ]
        },
        {
          label: 'Slide',
          value: 'slideOn'
        },
        {
          label: 'Footer',
          value: 'footerOn',
          showFields: [ 'smallFooter', 'titleColor', 'container', '_sideImage', 'sideImageRight' ]
        }
      ]
    },
    {
      name: '_backgroundImage',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Background Image',
      help: 'Choose a big background image for section',
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
      help: 'Activate to show backround image with parallax effect (default: Yes)',
      def: true
    },
    {
      name: 'shapeFillTop',
      type: 'string',
      label: 'Top Shape Divider',
      help: 'Add a custom shape divider to the top of parallax image ( copy the number in d from www.shapedivider.app, for example: M1200 0L0 0 598.97 114.72 1200 0z )'
    },
    {
      name: 'shapeFillTopInvert',
      type: 'boolean',
      label: 'Invert Top Shape Divider',
      help: 'Set to yes invert the top shape divider (default: No)',
      def: false
    },
    {
      name: 'shapeFillBottom',
      type: 'string',
      label: 'Bottom Shape Divider',
      help: 'Add a custom shape divider to the bottom of parallax image ( copy the number in d from www.shapedivider.app, for example: M1200 0L0 0 598.97 114.72 1200 0z )'
    },
    {
      name: 'shapeFillBottomInvert',
      type: 'boolean',
      label: 'Invert Bottom Shape Divider',
      help: 'Set to yes invert the top shape divider (default: No)',
      def: false
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
      fields: ['title', 'preferences', 'header', 'headerAlign']
    },
    {
      name: 'images',
      label: 'Images',
      fields: ['_backgroundImage', 'backgroundImageParallax', '_sideImage', 'sideImageRight']
    },
    {
      name: 'special',
      label: 'Shape Divider',
      fields: ['shapeFillTop', 'shapeFillTopInvert', 'shapeFillBottom', 'shapeFillBottomInvert']
    },
    {
      name: 'colors',
      label: 'Colors',
      fields: ['headerColor', 'color']
    },
    {
      name: 'options',
      label: 'Options',
      fields: ['smallFooter', 'container', 'glueWidgets']
    },
    {
      name: 'info',
      label: 'Info',
      fields: ['slug', 'tags', 'published']
    }
  ]
};
