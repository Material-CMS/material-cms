// This configures the apostrophe-fullpage module
// all elements in fullpage will in fullPage.js
// jQuery 3.x in apostrophe-assets neccecary
module.exports = {

  name: 'fullpage',
  label: 'Fullpage',

  //Create functions for pushing assets and create singleton in browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'vendor/jquery.fullpage.min');
      self.pushAsset('stylesheet', 'overrides');
      self.pushAsset('script', 'vendor/jquery.fullpage.min');
      self.pushAsset('script', 'init');
    };
  },

};
