module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-card',
  label: 'Material Card',
  contextualOnly: true,
    addFields: [
      {
        name: 'image',
        type: 'area'
      }
    ],
  //Create functions for pushing assets and create singleton in browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'styles', { when: 'always' });
      self.pushAsset('script', 'init', { when: 'always' });
    }
  }
};
