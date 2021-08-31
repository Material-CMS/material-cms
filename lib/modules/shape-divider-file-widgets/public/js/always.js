apos.define('texts-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Inject img as svg
      SVGInject($widget.getElementsByClassName('img-svg'));
    };
  }
});
