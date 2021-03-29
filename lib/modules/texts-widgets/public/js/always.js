apos.define('texts-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Collapsible
      var collapsibles = M.Collapsible.init($widget.find('.collapsible'), {
        // example-option: true
      });
    };
  }
});
