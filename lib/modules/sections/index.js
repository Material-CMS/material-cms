module.exports = {
  extend: 'apostrophe-pieces',
  name: 'section',
  label: 'Section',
  pluralLabel: 'Sections',
  contextualOnly: false,
  addFields: [
    // Main Fields
    {
      name: 'title',
      type: 'string',
      label: 'Section Title',
      help: 'Select Title'
    },
    {
      name: 'titleColor',
      type: 'color',
      label: 'Title Color',
      help: 'Remove to set title on accent color again'
    },
    {
      name: 'color',
      type: 'color',
      label: 'Section Color',
      help: 'Remove to set section on accent color again'
    },
    {
      name: 'preferences',
      type: 'select',
      label: 'Section Options',
      help: 'Make this section to Slider or Footer',
      choices: [
        {
          label: 'Slide',
          value: 'slideOn'
        },
        {
          label: 'Footer',
          value: 'footerOn'
        }
      ]
    },
    // Backgrounds
    {
      name: '_image',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Image',
      help: 'Choose Background for Section',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', '_image'] },
    { name: 'colors', label: 'Colors', fields: ['titleColor', 'color'] },
    { name: 'settings', label: 'Settings', fields: ['preferences'] }
  ],

  // Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  // Load third party styles and scripts
  // init.js has all settings for materialize components
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('script', 'vendor/lethargy.min', { when: 'always' });
      self.pushAsset('script', 'vendor/smartscroll.min', { when: 'always' });
      self.pushAsset('script', 'init', { when: 'always' });
    };
  }
};
