'use strict';
// Define color check function
function applyBackgroundColorClass(query) {
  var colorFields = document.querySelectorAll(query);
  for (var i = 0; i < colorFields.length; i++) {
    var bgColor = getComputedStyle(colorFields[i], null).getPropertyValue('background-color');
    var brightness = window.apos.utils.lightOrDark(bgColor);
    if (brightness == 'dark') {
      colorFields[i].classList.add('dark-background');
      colorFields[i].classList.remove('light-background');
    } else {
      colorFields[i].classList.add('light-background');
      colorFields[i].classList.remove('dark-background');
    }
  }
}

// Export function to apos.utils object
window.apos.utils.applyBackgroundColorClass = applyBackgroundColorClass;

// Set text colors accordingly to mainColor
document.addEventListener("DOMContentLoaded", function(event) {
  applyBackgroundColorClass('.card-stacked, .nav-wrapper, .sidenav, .btn-color');
});
