'use strict';

// Define color check function
function applyBackgroundColorClass(query) {
  var colorFields = document.querySelectorAll(query);
  for (var i = 0; i < colorFields.length; i++) {
    var bgColor = getComputedStyle(colorFields[i], null).getPropertyValue('background-color');
    var brightness = lightOrDark(bgColor);
    if (brightness == 'dark') {
      colorFields[i].classList.add('dark-background');
      colorFields[i].classList.remove('light-background');
    } else {
      colorFields[i].classList.add('light-background');
      colorFields[i].classList.remove('dark-background');
    }
  }
}

// Light or dark color check,
// sets class according to an  light or dark background color.
// Thx to: https://codepen.io/andreaswik/pen/YjJqpK
function lightOrDark(color) {
  // Check the format of the color, HEX or RGB?
  var r, g, b, hsp;
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
}

// Export function to apos.utils object
window.apos.utils.applyBackgroundColorClass = applyBackgroundColorClass;
