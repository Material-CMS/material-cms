'use strict';

// Global util functions
function isPortrait(img) {
  var width = img.width;
  var height = img.height;
  return (height > width);
}

function isDesktop() {
  var width = window.innerWidth;
  return (width > 600);
}

// Lazy load all images with an data-src attribute
function changeSrc(img) {
  if (img.getAttribute('data-src')) {
    img.setAttribute('src', img.getAttribute('data-src'));
  }
}

// Export functions to apos.utils object
// window.apos.utils.isPortrait = isPortrait;
// window.apos.utils.isDesktop = isDesktop;
