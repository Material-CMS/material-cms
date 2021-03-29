apos.define('sections-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Parallax
      var parallax = M.Parallax.init($widget.find('.parallax'), {
        // example-option: true
      });
    };
  }
});
