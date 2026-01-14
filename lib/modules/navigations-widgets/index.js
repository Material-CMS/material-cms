module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'navigations',
  label: 'Nav Widget',
  addFields: [
    {
      name: 'nav',
      type: 'select',
      label: 'Navigation',
      help: 'Choose navigation, ether default, dropdown, manual or hide.',
      choices: [
        {
          label: 'Default',
          value: 'default',
          def: true
        },
        {
          label: 'Manual',
          value: 'manual',
          showFields: [ 'by' ]
        },
        {
          label: 'Hide',
          value: false
        }
      ]
    },
    {
      name: '_navBackgroundImage',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Navigation Background Image',
      help: 'Choose a background image for navigation. (Navigation will activate pushpin feature)',
      filters: {
        projection: {
          attachment: 1,
          description: 1,
          title: 1
        }
      }
    },
    {
      name: 'gradientColorTop',
      label: 'Background Gradient Color Top',
      type: 'color',
      help: 'Choose the top color for navigation background gradient overlay.'
    },
    {
      name: 'gradientColorBottom',
      label: 'Background Gradient Color Bottom',
      type: 'color',
      help: 'Choose the bottom color for navigation background gradient overlay.'
    },
    {
      name: 'navDouble',
      type: 'boolean',
      label: 'Navigation Double Width',
      help: 'Activate double width with collapse feature for nav. (Default: No)',
      def: false
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [
        'nav',
        'by',
        'limitByAll',
        'tags',
        '_pieces',
        'limitByTag',
        'navDouble'
      ]
    },
    {
      name: 'pushpin',
      label: 'Pushpin',
      fields: [
        '_navBackgroundImage',
        'gradientColorTop',
        'gradientColorBottom'
      ]
    }
  ],
  filters: {
    projection: {
      slug: 1,
      title: 1,
      linkArea: 1
    }
  },
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
