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
      name: '_logo',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Logo',
      help: 'Choose a logo for your website. (Overrides global navigation logo)',
      filters: {
        projection: {
          attachment: 1,
          description: 1,
          title: 1
        }
      }
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
      name: 'navColor',
      label: 'Navigation Color',
      type: 'color',
      help: 'Choose color to override global navigation color.'
    },
    {
      name: 'navTextColor',
      label: 'Navigation Text Color',
      type: 'color',
      help: 'Choose color to override text color for navigation.'
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
      name: 'navShadow',
      type: 'boolean',
      label: 'Navigation Shadow',
      help: 'Choose shadow for navigation. (Default: Yes)',
      def: false
    },
    {
      name: 'linksArray',
      label: 'Links',
      type: 'array',
      help: 'Choose external links which will be shown in navigation. (You can choose material icons too)',
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
          label: 'Links to other Pages',
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
      name: 'basics',
      label: 'Basics',
      fields: ['nav', 'by', 'limitByAll', 'tag', '_pieces', 'limitByTag']
    },
    {
      name: 'images',
      label: 'Images',
      fields: ['_logo', '_navBackgroundImage']
    },
    {
      name: 'colors',
      label: 'Colors',
      fields: ['navColor', 'navTextColor', 'gradientColorTop', 'gradientColorBottom']
    },
    {
      name: 'options',
      label: 'Options',
      fields: ['navShadow','linksArray']
    },
    {
      name: 'options',
      label: 'Options',
      fields: ['navShadow','linksArray']
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
    if (self.apos.assets.options.lean) {
      if (self.options.player) {
        self.pushAsset('script', 'lean', { when: 'lean' });
      }
    } else {
      self.pushAsset('script', 'always', { when: 'always' });
    }
  }
};
