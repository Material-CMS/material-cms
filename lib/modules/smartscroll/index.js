// This configures the apostrophe-smartscroll (fullpage scroll) module
// All scroll options in init.js
// jQuery 3.x in apostrophe-assets neccecary
module.exports = {

  name: 'fullpage',
  label: 'Fullpage',

  //Create functions for pushing assets and create singleton in browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  //Load scripts
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('script', 'vendor/eventemitter.min');
      self.pushAsset('script', 'vendor/lethargy.min');
      self.pushAsset('script', 'vendor/smartscroll.min');
      self.pushAsset('script', 'init');
    };
  },

};
