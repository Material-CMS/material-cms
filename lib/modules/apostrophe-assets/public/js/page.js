'use strict';

// Scripts initialization for pages
document.addEventListener("DOMContentLoaded", function(event) {

  // Call background color check function exported to `window.apos.utils.applyBackgroundColorClass`
  // TODO: check if this causes breaking changes, maybe better to create new instances of this function
  applyBackgroundColorClass('.card-stacked, .nav-wrapper, .sidenav, .btn-color, .page-footer, .modal');

  // Check if it's a ajax-append page
  var ajax = document.querySelector('.ajax-append.active');
  if (ajax) {
    // Check if .pagination is in DOM
    var nextSelector = ajax.querySelector('.pagination-wrapper a.next');
    if (nextSelector) {
      // Initialize new infinity instance
      new infinity(ajax, {
        navSelector: '.pagination-wrapper',
        nextSelector: '.pagination-wrapper a.next',
        loadingSelector: null,
        pageFragment: '.ajax-append',
        scrollBuffer: 200,
        scrollOnLoad: true,
        scrollOnLoadDistance: 200,
        scrollOnLoadSpeed: 500,
        onInit: function () {},
        beforeContentLoaded: function (link) {},
        afterContentLoaded: function (html) {}
      });
    }
  }

  // Lazy load all images with an data-src attribute
  var images= document.getElementsByTagName('img');
  for (var i=0; i<images.length; i++) {
    if (images[i].getAttribute('data-src')) {
      images[i].setAttribute('src', images[i].getAttribute('data-src'));
    }
  }

});
