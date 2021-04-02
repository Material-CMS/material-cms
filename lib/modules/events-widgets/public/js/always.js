apos.define('events-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Collapsible
      var collapsible = $widget.find('.collapsible');
      if (collapsible.length) {
        collapsible.collapsible();
      }
    };
  }
});
