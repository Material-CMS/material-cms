// Lightbox function
'use strict';

function ligthboxEffect(element) {

  var html = document.documentElement;
  var lightboxOverlay = element.getElementsByClassName('lightbox-overlay')[0];
  var lightboxImage = element.getElementsByClassName('lightbox-image')[0];
  var img = lightboxImage.getElementsByTagName('img')[0];

  // Lazy load all images with an data-src attribute
  changeSrc(img);

  // Set active state
  var lightboxActive = false;

  // Add ligtbox cursor
  lightboxImage.style.cursor = 'zoom-in';

  // Lightbox image animation on
  function imageLightboxOn() {

    // Check if it is a portrait image or not
    if (isPortrait(img)) {
      lightboxImage.classList.add('portrait');
    }

    // Scrol Element in the Center of page
    scrollToCenter(lightboxImage);

    setTimeout(function() {
      lightboxImage.classList.add('active');
      lightboxOverlay.classList.add('active');

      setTimeout(function() {
        lightboxOverlay.style.opacity = 1;
        lightboxImage.style.opacity = 1;
      }, 100);

      // Set active state
      lightboxActive = true;

      // SBlock scroll
      html.style.overflowY = 'hidden';
    }, 200);

  }

  // Lightbox image animation off
  function imageLightboxOff() {
    lightboxImage.style.opacity = 0;
    lightboxOverlay.style.opacity = 0;

    setTimeout(function() {
      lightboxImage.classList.remove('active');
      lightboxOverlay.classList.remove('active');

      // Set active state
      lightboxActive = false;

      // SBlock scroll
      html.style.overflowY = 'scroll';

    }, 400);

  }

  // Lightbox image click event
  lightboxImage.addEventListener('click', _.throttle(function(e) {
    if (!lightboxActive) {
      imageLightboxOn();
    } else {
      imageLightboxOff();
    }
    e.stopPropagation();
  }, 400));

  // return element.lightboxActivated = true;
  return {
    lightboxActivated: element.lightboxActivated = true,
    get lightboxActive() {
      return lightboxActive;
    }
  };
}
