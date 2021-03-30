apos.define('sections-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Parallax
      var parallax = el.querySelectorAll('.parallax');
      for (var i = 0; i < parallax.length; i++) {
        M.Parallax.init(parallax[i], {
          // example-option: true
        });
      }
    };
  }
});
