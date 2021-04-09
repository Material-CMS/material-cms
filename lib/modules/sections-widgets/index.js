module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'sections',
  label: 'Sections Widget',
  addFields: [
    {
      name: 'sectionMinHeight',
      label: 'Section Fullscreen',
      type: 'boolean',
      help: 'Set height of Section to fullscreen (default: Yes).',
      def: true
    },
  ],
  arrangeFields: [
    {
      name: 'select',
      label: 'Select',
      fields: [
        'by',
        'limitByAll',
        '_pieces',
        'tags',
        'limitByTag'
      ]
    },
    {
      name: 'settings',
      label: 'Settings',
      fields: [
        'sectionMinHeight'
      ]
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
      sectionStyle: 1,
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
  },
  // Add lean and always scripts
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
