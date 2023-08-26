// Lightbox function
'use strict';

function ligthboxEffect(element) {
  var body = document.querySelector('body');
  var nav = document.querySelector('.nav-content');
  var lightboxImage = element.querySelector('.lightbox-image');
  var lightboxOverlay = element.querySelector('.lightbox-overlay');

  // Set active state
  var lightboxClick = true;

  // Add ligtbox cursor
  lightboxImage.style.cursor = 'zoom-in';

  // Lightbox image animation on
  function imageLightboxOn() {

    // Get image and check orientation
    var img = lightboxImage.querySelector('img');

    if (isPortrait(img)) {
      lightboxImage.classList.add('portrait');
    }

    // TODO: Add smooth scroll polyfill
    // https://www.npmjs.com/package/smoothscroll-polyfill
    lightboxImage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    setTimeout(function() {
      lightboxImage.classList.add('active');
      lightboxOverlay.classList.add('active');

      setTimeout(function() {
        lightboxOverlay.style.opacity = 1;
        lightboxImage.style.opacity = 1;
      }, 100);

      // Set active state
      lightboxClick = false;

      // SBlock scroll
      body.style.overflowY = 'hidden';
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
      lightboxClick = true;

      // SBlock scroll
      body.style.overflowY = 'scroll';

    }, 400);

  }

  // Lightbox image click event
  lightboxImage.addEventListener('click', function(e) {
    if (lightboxClick) {
      imageLightboxOn();
    } else {
      imageLightboxOff();
    }
  });
}

// It seems not neccecary to export this function
// window.apos.utils.ligthboxEffect = ligthboxEffect;
