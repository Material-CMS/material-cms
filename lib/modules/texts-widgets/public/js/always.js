apos.define('texts-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {

      // Initialize Materialize Collapsible
      var collapsible = $widget.find('.collapsible');
      if (collapsible.length) {
        collapsible.collapsible();
      }

      // Card content color checker jquery version
      var cardContents = $widget.find('.card-content');
      if (cardContents.length) {
        var bgColor, brightness, r, g, b, hsp;
        bgColor = $(cardContents).css('background-color');
        brightness = lightOrDark(bgColor);
        if(brightness == 'dark') {
          $(cardContents).addClass('dark-background');
        }
        else {
          $(cardContents).addClass('light-background');
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

      // Button Color Cecker jquery version
      var buttons = $widget.find('.btn-color');
      if (buttons.length) {
        var bgColor, brightness, r, g, b, hsp;
        bgColor = $(buttons).css('background-color');
        brightness = lightOrDark(bgColor);
        if(brightness == 'dark') {
          $(buttons).addClass('dark-background');
        }
        else {
          $(buttons).addClass('light-background');
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
