module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-text',
  label: 'Text widget',
  contextualOnly: false,
  addFields: [
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
    {
      name: 'tab1',
      label: 'First Tab',
      type: 'string'
    },
    {
      name: 'tab2',
      label: 'Second Tab',
      type: 'string'
    },
    {
      name: 'tab3',
      label: 'Third Tab',
      type: 'string'
    },
    {
      name: 'text1',
      label: 'First Text',
      type: 'string'
    },
    {
      name: 'text2',
      label: 'Second Text',
      type: 'string'
    },
    {
      name: 'text3',
      label: 'Third Text',
      type: 'string'
    },
  ],
    arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'text' ]
    },
    {
      name: 'tabs1',
      label: 'First Tab',
      fields: [ 'tab1', 'text1' ]
    },
    {
      name: 'tabs2',
      label: 'Second Tab',
      fields: [ 'tab2', 'text2' ]
    },
    {
      name: 'tabs3',
      label: 'Third Tab',
      fields: [ 'tab3', 'text3' ]
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
