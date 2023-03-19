apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function(self, options) {
    self.beforeCkeditorInline = function() {
      // Deactivate CKE spellcheker and user browser spellcheker
      self.config.disableNativeSpellChecker = false;
      self.config.removePlugins = 'scayt';
    };
  }
});
