module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'sections',
  label: 'Sections Widget',
  addFields: [
    {
      name: '_backgroundImage',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Navigation Background Image',
      help: 'Choose a background image for navigation (nav will activate pushpin feature)',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    },
    {
      name: 'gradientColorTop',
      label: 'Background Gradient Color Top',
      type: 'color',
      help: 'Choose the top color for navigation background gradient overlay'
    },
    {
      name: 'gradientColorBottom',
      label: 'Background Gradient Color Bottom',
      type: 'color',
      help: 'Choose the bottom color for navigation background gradient overlay'
    },
    {
      name: 'navShadow',
      type: 'boolean',
      label: 'Navigation Shadow',
      help: 'Choose shadow for navigation (default: Yes)',
      def: false
    },
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      help: 'Choose External Links for Main Menu',
      titleField: 'name',
      schema: [
        {
          name: 'name',
          type: 'string',
          label: 'Name'
        },
        {
          type: 'url',
          name: 'url',
          label: 'Links to Other Pages',
        },
        {
          name: 'icon',
          type: 'string',
          label: 'Icon'
        }
      ]
    }
  ],
  arrangeFields: [
    {
      name: 'select',
      label: 'Select',
      fields: ['by', 'limitByAll', '_pieces', 'tags', 'limitByTag']
    },
    {
      name: 'nav',
      label: 'Navigation',
      fields: ['navShadow', '_backgroundImage', 'gradientColorTop', 'gradientColorBottom']
    },
    {
      name: 'settings',
      label: 'Settings',
      fields: ['buttonOn', 'links']
    }
  ],
  filters: {
    projection: {
      slug: 1,
      title: 1,
      header: 1,
      headerAlign: 1,
      type: 1,
      tags: 1,
      color: 1,
      headerColor: 1,
      titleShow: 1,
      container: 1,
      glueWidgets: 1,
      preferences: 1,
      default: 1,
      slideOn: 1,
      footerOn: 1,
      _backgroundImage: 1,
      backgroundImageParallax: 1,
      shapeFillTop: 1,
      shapeFillTopInvert: 1,
      shapeFillBottom: 1,
      shapeFillBottomInvert: 1,
      shapeFillHeight: 1,
      _sideImage: 1,
      _url: 1,
      sideImageRight: 1,
      smallFooter: 1,
      thankYouMessage: 1,
      sliderContent: 1,
      content: 1 // Data for Container Widgets see widget.html
    }
  }
};
