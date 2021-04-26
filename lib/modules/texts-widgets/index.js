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
    },
    {
      name: 'buttonLightHover',
      label: 'Button Light Hover',
      type: 'boolean',
      help: 'Hover effect for button is lighten. (In case of dark button background)',
      def: false
    },
  ],
  // Fields Arrangement
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
        'buttonLightHover'
      ]
    }
  ],
  // Filter what is loaded from piece
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      titleShow: 1,
      titleAlign: 1,
      backColor: 1,
      extraLink: 1,
      blog: 1,
      description: 1,
      text: true,
      buttonText: 1,
      linkText: 1,
      sideImage: 1,
      topImage: 1,
      sideImageLeft: 1,
      _url: 1
    }
  },
  // Add lean and always materialize initialization with parameters
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
