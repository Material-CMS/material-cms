apos.define('footer-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Modal
      var modals = $widget.find('.modal');
      if (modals.length) {
        modals.modal();
      }
    };
  }
});
