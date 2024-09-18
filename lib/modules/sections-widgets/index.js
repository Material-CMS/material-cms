module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'sections',
  label: 'Sections Widget',
  addFields: [
    {
      name: 'sectionMinHeight',
      label: 'Section Height Fullscreen',
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
      backgroundColor: 1,
      headerColor: 1,
      headerAdditionalFont: 1,
      titleShow: 1,
      container: 1,
      glueWidgets: 1,
      sectionSlide: 1,
      default: 1,
      slideOn: 1,
      footerOn: 1,
      _backgroundImage: 1,
      backgroundImageParallax: 1,
      _url: 1,
      smallFooter: 1,
      thankYouMessage: 1,
      sliderContent: 1,
      shapeDividerTop: 1,
      shapeDividerBottom: 1,
      content: 1 // Data for Container Widgets see widget.html
    }
  },
  // Add lean and always scripts
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
