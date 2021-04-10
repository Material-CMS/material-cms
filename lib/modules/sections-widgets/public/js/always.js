apos.define('sections-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {

      // Initialize Materialize Parallax
      var parallax = $widget.find('.parallax');
      if (parallax.length) {
        parallax.parallax();
      }

    };
  }
});
