// This is the Materialize Core Module
var apos = require('apostrophe')
module.exports = {

  name: 'materialize',

  moogBundle: {
    modules: [ 'texts', 'text-widgets' ],
    directory: 'lib/modules'
  },

  // Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  // Load third party styles and scripts
  // init.js has all settings for materialize components
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'vendor/materialize.min', { when: 'always' });
      self.pushAsset('stylesheet', 'overrides', { when: 'always' });
      self.pushAsset('script', 'vendor/materialize', { when: 'always' });
      self.pushAsset('script', 'init', { when: 'always' });
    };
  }
};
