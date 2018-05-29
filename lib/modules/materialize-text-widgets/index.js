module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-text',
  label: 'Text widget',
  contextualOnly: false,
  addFields: [
    // Main Fields
    {
      name: 'title',
      label: 'Title',
      type: 'string'
    },
    {
      name: 'text',
      label: 'Description',
      type: 'string'
    },
    // Tab Fields
    {
      name: 'tab1',
      label: 'Text',
      type: 'string'
    },
    {
      name: 'tab2',
      label: 'Text',
      type: 'string'
    },
    {
      name: 'tab3',
      label: 'Text',
      type: 'string'
    },
    // Text Fields
    {
      name: 'text1',
      label: 'Description',
      type: 'string'
    },
    {
      name: 'text2',
      label: 'Description',
      type: 'string'
    },
    {
      name: 'text3',
      label: 'Description',
      type: 'string'
    },
    // Icon Fields
    {
      name: 'icon1',
      label: 'Icon',
      type: 'string'
    },
    {
      name: 'icon2',
      label: 'Icon',
      type: 'string'
    },
    {
      name: 'icon3',
      label: 'Icon',
      type: 'string'
    },
    // Coices Fields
    {
      type: 'select',
      name: 'tab1-choice',
      label: 'Do you want text or icon?',
      choices: [
        {
          label: 'Text',
          value: 'tab1-text',
          showFields: [
            'tab1',
          ]
        },
        {
          label: 'Icon',
          value: 'tab1-icon',
          showFields: [
            'icon1',
          ]
        }
      ]
    },
    {
      type: 'select',
      name: 'tab2-choice',
      label: 'Do you want text or icon?',
      choices: [
        {
          label: 'Text',
          value: 'tab2-text',
          showFields: [
            'tab2',
          ]
        },
        {
          label: 'Icon',
          value: 'tab2-icon',
          showFields: [
            'icon2',
          ]
        }
      ]
    },
    {
      type: 'select',
      name: 'tab3-choice',
      label: 'Do you want text or icon?',
      choices: [
        {
          label: 'Text',
          value: 'tab3-text',
          showFields: [
            'tab3',
          ]
        },
        {
          label: 'Icon',
          value: 'tab3-icon',
          showFields: [
            'icon3',
          ]
        }
      ]
    },
  ],
  // Arrange Fields
    arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'text' ]
    },
    {
      name: 'tabs1',
      label: 'First Tab',
      fields: [ 'tab1-choice', 'tab1', 'icon1', 'text1' ]
    },
    {
      name: 'tabs2',
      label: 'Second Tab',
      fields: [ 'tab2-choice', 'tab2', 'icon2', 'text2' ]
    },
    {
      name: 'tabs3',
      label: 'Third Tab',
      fields: [ 'tab3-choice', 'tab3', 'icon3', 'text3' ]
    }
  ],
  //Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },
  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'footer', { when: 'always' });
    };
  }

};
