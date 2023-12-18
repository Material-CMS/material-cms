'use strict';

/**
 * Check if desktop
 * @returns true if screen width is bigger than 600px
 */
function isDesktop() {
  var width = window.innerWidth;
  return (width > 600);
}

/**
 * Check for image orientation
 * @param {img} element
 * @returns true if image height is bigger than width
 */
function isPortrait(img) {
  var width = img.width;
  var height = img.height;
  return (height > width);
}

/**
 * Lazy image load function
 * @param {img} element with data-src attribute
 * cahnges image attribute from data-src to src
 */
function changeSrc(img) {
  if (img.getAttribute('data-src')) {
    img.setAttribute('src', img.getAttribute('data-src'));
  }
}

/**
 * Replacement for scrollIntoView() method, cause this method moves whole page under specific circumstances
 * https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
 * @param {HTMLElement} element
 */
function scrollToCenter(element) {
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var elementCentre = element.getBoundingClientRect().top + element.getBoundingClientRect().height / 2;
  var windowOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var target =  elementCentre - viewportHeight / 2 + windowOffset;
  if (window.scrollTo) {
    window.scrollTo({
      top: target,
      behavior: 'smooth'
    });
  } else {
    window.scroll(0, target);
  }
}

/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix = style['transform'] || style.webkitTransform || style.mozTransform;
  // No transform property. Simply return 0 values.
  if (matrix === 'none' || typeof matrix === 'undefined') {
    return {
      x: 0,
      y: 0,
      z: 0,
    }
  }
  // Can either be 2d or 3d transform
  const matrixType = matrix.includes('3d') ? '3d' : '2d'
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === '2d') {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    }
  }
  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === '3d') {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    }
  }
}

/**
 * Color Check function
 * @param {HTMLElements} element
 * @returns {Object}
 */
function applyBackgroundColorClass(element) {
  var bgColor = getComputedStyle(element, null).getPropertyValue('background-color');
  var brightness = lightOrDark(bgColor);
  if (brightness == 'dark') {
    element.classList.add('dark-background');
  } else {
    element.classList.remove('dark-background');
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
