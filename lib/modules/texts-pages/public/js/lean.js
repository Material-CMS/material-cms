'use strict';
document.addEventListener("DOMContentLoaded", function(event) {
console.log('texts script');
  // Card content color checker
  var colorFields = document.querySelectorAll('.card-stacked, .btn-color');
  for (var i = 0; i < colorFields.length; i++) {
    var bgColor = getComputedStyle(colorFields[i], null).getPropertyValue('background-color');
    var brightness = util.lightOrDark(bgColor);
    if (brightness == 'dark') {
      colorFields[i].classList.add('dark-background');
    }
    else {
      colorFields[i].classList.add('light-background');
    }
  }

});
