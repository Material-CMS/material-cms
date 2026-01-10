'use strict';

// Scripts initialization for pages
document.addEventListener("DOMContentLoaded", function(event) {

  // Call background color check function exported to `window.apos.utils.applyBackgroundColorClass`
  // TODO: check if this causes breaking changes, maybe better to create new instances of this function
  var colorFields = document.querySelectorAll('.card-stacked, .btn-color');
  for (var i = 0; i < colorFields.length; i++) {
    if (!colorFields[i].classList.contains('dark-background')) {
      applyBackgroundColorClass(colorFields[i]);
    }
  }

  // Check if it's a ajax-append page
  var ajax = document.querySelector('.ajax-append.active');
  if (ajax) {
    // Check if .pagination is in DOM
    var nextSelector = ajax.querySelector('.pagination-wrapper a.next');
    if (nextSelector) {
      // Find the data-apos-ajax-append element inside to get context
      var appendElement = ajax.querySelector('[data-apos-ajax-append]');
      var context = appendElement ? appendElement.getAttribute('data-apos-ajax-append') : 'infinite-scroll';
      
      // Set up scroll detection using apos.utils.ajaxAppend
      var scrollBuffer = 200;
      var isLoading = false;
      
      window.addEventListener('scroll', function() {
        if (isLoading) return;
        
        if (window.scrollY >= document.body.scrollHeight - window.innerHeight - scrollBuffer) {
          isLoading = true;
          var nextLink = nextSelector.getAttribute('href');
          if (nextLink) {
            apos.utils.ajaxAppend(context, nextLink, {
              beforeContentLoaded: function() {
                // Optional: show loading indicator
              },
              afterContentLoaded: function() {
                isLoading = false;
                // Update nextSelector for next page
                nextSelector = ajax.querySelector('.pagination-wrapper a.next');
              }
            });
          }
        }
      });
    }
  }


  // Check for lightbox containers and trigger lighbox function if not activated by widget
  var lightboxImages = document.getElementsByClassName('lightbox');
  if (lightboxImages) {
    for (var i = 0; i < lightboxImages.length; i++) {
      if (!lightboxImages[i].lightboxActivated) {
        ligthboxEffect(lightboxImages[i]);
      }
    }
  }

});
