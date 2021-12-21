apos.define('footer-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {

      // initialize Materialize Modal
      var modals = $widget.find('.modal');
      if (modals.length) {
        modals.modal();
      }

      // button color checker jquery version
      var elements = $widget.find('.page-footer, .btn-color');
      if (elements.length) {
        var bgColor, brightness, r, g, b, hsp;
        bgColor = $(elements).css('background-color');
        brightness = lightOrDark(bgColor);
        if(brightness == 'dark') {
          $(elements).addClass('dark-background');
        }
        else {
          $(elements).addClass('light-background');
        }
        function lightOrDark(color) {
          if (color.match(/^rgb/)) {
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            r = color[1];
            g = color[2];
            b = color[3];
          }
          else {
            color = +("0x" + color.slice(1).replace(
              color.length < 5 && /./g, '$&$&'
            ));
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
          }
          hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
          );
          if (hsp>127.5) {
            return 'light';
          }
          else {
            return 'dark';
          }
        };
      }

    };
  }
});
