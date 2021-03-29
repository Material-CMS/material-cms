apos.define('events-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Floating Action Button
      var collapsibles = M.Collapsible.init($widget.find('.collapsible'), {
        // example-option: true
      });
    };
  }
});
