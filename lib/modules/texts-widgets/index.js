module.exports = {
  name: 'texts',
  label: 'Texts Widget',
  extend: 'apostrophe-pieces-widgets',

  //Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },
  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'styles', { when: 'always' });
    };
  }
};
