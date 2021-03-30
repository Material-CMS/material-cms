apos.define('texts-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Collapsible
      var collapsibles = el.querySelectorAll('.collapsible');
      for (var i = 0; i < collapsibles.length; i++) {
        M.Collapsible.init(collapsibles[i], {
          // example-option: true
        });
      }
    };
  }
});
