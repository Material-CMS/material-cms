module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'texts',
  label: 'Texts Widget',
  addFields: [
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Element Shadow',
      help: 'Choose if element has a shadow. (default: Yes)',
      def: true
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
        'shadow'
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
      extraLink: 1,
      blog: 1,
      description: 1,
      text: true,
      buttonText: 1,
      buttonTextClose: 1,
      linkArea: 1,
      sideImage: 1,
      topImage: 1,
      sideImageLeft: 1,
      _url: 1
    }
  },
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
