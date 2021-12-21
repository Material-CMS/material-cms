apos.utils.widgetPlayers['texts'] = function(el, data, options) {

  // Card content color checker
  // Thx to: https://codepen.io/andreaswik/pen/YjJqpK
  var elements = el.querySelectorAll('.btn-color');
  for (var i = 0; i < elements.length; i++) {
    var bgColor, brightness, r, g, b, hsp;
    bgColor = getComputedStyle(elements[i], null).getPropertyValue('background-color');
    brightness = lightOrDark(bgColor);
    if(brightness == 'dark') {
      elements[i].classList.add('dark-background');
    }
    else {
      elements[i].classList.add('light-background');
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
