// This is the Materialize Core Module
var apos = require('apostrophe')
module.exports = {

  name: 'materialize',

  moogBundle: {
    modules: [ 'materialize-card-widgets' ],
    directory: 'lib/modules'
  },

  //Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'vendor/materialize', { when: 'always' });
      self.pushAsset('stylesheet', 'overrides', { when: 'always' });
      self.pushAsset('script', 'vendor/materialize', { when: 'always' });
      self.pushAsset('script', 'init', { when: 'always' });
    };
  }
};
