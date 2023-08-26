'use strict';

// Global util functions
function isPortrait(img) {
  var width = img.width;
  var height = img.height;
  return (height > width);
}

function isDesktop() {
  console.log("triggered");
  var width = window.innerWidth;
  return (width > 600);
}

// Export functions to apos.utils object
// window.apos.utils.isPortrait = isPortrait;
// window.apos.utils.isDesktop = isDesktop;
