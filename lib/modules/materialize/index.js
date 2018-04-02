// This configures the apostrophe-fullpage module
// all elements in fullpage will in fullPage.js
// jQuery 3.x in apostrophe-assets neccecary
var apos = require('apostrophe')
module.exports = {

  name: 'materialize',
  label: 'Materialize',

  //Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'vendor/materialize', { when: 'always' });
      self.pushAsset('script', 'vendor/materialize', { when: 'always' });
    };
  }
};
console.log('Materialize CSS pushed to browser!')
