apos.utils.widgetPlayers['button'] = function(el, data, options) {

  // initialize materialize floating action button
  var btn = el.querySelectorAll('.fixed-action-btn');
  for (var i = 0; i < btn.length; i++) {
    M.FloatingActionButton.init(btn[i], {
      hoverEnabled: data.hoverEnabled
    });
  }

  // button color cecker, pure js version
  // loops trough elements and check if they have light colors or dark
  // thx to: https://codepen.io/andreaswik/pen/YjJqpK
  var elements = el.querySelectorAll('.btn-color');
  for (var i = 0; i < elements.length; i++) {
    // create element specific vars
    var bgColor, brightness, r, g, b, hsp;
    // get button color
    bgColor = getComputedStyle(elements[i], null).getPropertyValue('background-color');
    // get brightness of button color
    brightness = lightOrDark(bgColor);
    // add classes to buttons according to results of brightness
    if(brightness == 'dark') {
      elements[i].classList.add('dark-background');
    }
    else {
      elements[i].classList.add('light-background');
    }
    function lightOrDark(color) {
      // Check the format of the color, HEX or RGB?
      if (color.match(/^rgb/)) {
        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
      }
      else {
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
          color.length < 5 && /./g, '$&$&'
        ));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
      }
      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      );
      // Using the HSP value, determine whether the color is light or dark
      if (hsp>127.5) {
        return 'light';
      }
      else {
        return 'dark';
      }
    };
  }

};
