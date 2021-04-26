apos.utils.widgetPlayers['texts'] = function(el, data, options) {
  // Initialize Materialize Collapsible
  var collapsibles = el.querySelectorAll('.collapsible');
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i], {
      // example-option: true
    });
  }

  // Button Color Cecker
  // use this to set the background color of an element
  // Thx to: https://codepen.io/andreaswik/pen/YjJqpK
  var buttons = el.querySelectorAll('.btn-color');
  for (var i = 0; i < buttons.length; i++) {
    var btnColor, brightness, r, g, b, hsp;
    btnColor = getComputedStyle(buttons[i], null).getPropertyValue('background-color');
    brightness = lightOrDark(btnColor);
    if(brightness == 'dark') {
      buttons[i].classList.add('dark-background');
    }
    else {
      buttons[i].classList.add('light-background');
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
