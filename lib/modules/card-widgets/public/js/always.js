apos.define('card-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize image expand
      var expand = $widget.find('.expand-init');
      if (expand.length) {
        expand.expand();
      }
    };
  }
});
