apos.define('slider-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Slider
      var slider = M.Slider.init($widget.find('.slider'), {
        indicators: data.indicators,
        height: 400,
        duration: 500,
        interval: 6000
      });
    };
  }
});
