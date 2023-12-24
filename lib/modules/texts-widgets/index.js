module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'texts',
  label: 'Texts Widget',
  addFields: [
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Element Shadow',
      help: 'Activate shadow for element if deactiavted on page level. (default: No)',
      def: false
    },
    {
      name: 'blog',
      type: 'select',
      label: 'Blog Text',
      htmlHelp: 'Text content is now opened in a separate page and will be shown as a blog entry with social share buttons.' + '<br />' + '<br />' +
      '<span>only works with text page on your site, so add a new text page under page settings and name it blog for example</span>',
      choices: [
        {
          label: 'No',
          value: false,
          def: true,
          showFields: [
            'buttonTextClose'
          ]
        },
        {
          label: 'Yes',
          value: true,
          showFields: [
            'topImage'
          ]
        }
      ]
    },
    {
      name: 'buttonText',
      type: 'string',
      label: 'Button Text',
      help: 'Change text of more or blog button to something more personal than "more" or "read".'
    },
    {
      name: 'buttonTextClose',
      type: 'string',
      label: 'Button Text Close',
      help: 'Change text of more button to something more personal than "close".'
    }
  ],
  arrangeFields: [
    {
      name: 'texts',
      label: 'Texts',
      fields: [
        'by',
        'limitByAll',
        '_pieces',
        'tags',
        'limitByTag'
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'shadow',
        'blog',
        'buttonText',
        'buttonTextClose'
      ]
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      titleAdditionalFont: 1,
      titleShow: 1,
      titleAlign: 1,
      backColor: 1,
      description: 1,
      text: true,
      topImage: 1,
      topImageRounded: 1,
      _url: 1
    }
  },
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
