'use strict';

// Global util functions
function isDesktop() {
  var width = window.innerWidth;
  return (width > 600);
}

function isPortrait(img) {
  var width = img.width;
  var height = img.height;
  return (height > width);
}

function changeSrc(img) {
  if (img.getAttribute('data-src')) {
    img.setAttribute('src', img.getAttribute('data-src'));
  }
}
