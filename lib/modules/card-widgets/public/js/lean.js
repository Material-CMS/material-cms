apos.utils.widgetPlayers['card'] = function(el, data, options) {

  // Get global elements
  var body = document.querySelector('body');
  var nav = document.querySelector('.nav-content');

  // Lightbox click action
  if (data.clickAction == 'clickActionLightbox') {

    var lightboxImage = el.querySelector('.lightbox-image');
    var lightboxOverlay = el.querySelector('.lightbox-overlay');

    // Set active state
    var lightboxClick = true;

    // Lightbox image animation on
    function imageLightboxOn() {

      // TODO: Add smooth scroll polyfill
      // https://www.npmjs.com/package/smoothscroll-polyfill
      lightboxImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
      });

      // Get elements
      var img = lightboxImage.querySelector('img');

      // Check image orientation
      if (isPortrait(img)) {
        lightboxImage.classList.add('portrait');
      }

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
      }, 300);

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

  // Animate click action
  if (data.clickAction == 'clickActionAnime') {

    // Get elements
    var animeCol = el.querySelector('.anime');
    var overlay = el.querySelector('.anime-overlay');
    var animeImage = el.querySelector('.anime-image');
    var animeContainer = el.querySelector('.anime-container');
    var cardContent = animeContainer.querySelector('.card-content');
    var scrollTarget = animeContainer;

    // Set active state
    var animeClick = true;

    // On animation
    function imageAnimationOn() {

      // Set active state
      animeClick = false;

      // Get elements
      var img = animeImage.querySelector('img');

      // Activate animeCol
      animeCol.classList.add('active');

      // SBlock scroll
      body.style.overflowY = 'hidden';

      // Check image orientation
      if (isPortrait(img)) {
        animeImage.classList.add('portrait');
      }

      // Desktop animation
      if (isDesktop()) {
        // Change scroll target
        scrollTarget = animeCol;
        // Use timeout to prevent jumping
        setTimeout(function() {
          // Special columns animation
          animateColumns('add');
        }, 500);

      }

      // TODO: Add smooth scroll polyfill
      // https://www.npmjs.com/package/smoothscroll-polyfill
      scrollTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
      });

      // Main animation
      var imageAnimation = anime({
        targets: animeImage,
        translateY: ['0%', '-100%'],
        translateX: ['0%', '10%'],
        scale: 0.3,
        marginTop: '40px',
        duration: 400,
        easing: 'easeOutQuad'
      });

      var bodyAnimation = anime({
        targets: animeContainer,
        scale: 1,
        opacity: '1',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var overlayAnimation = anime({
        targets: overlay,
        opacity: '1',
        duration: 400,
        easing: 'easeInOutQuad'
      });

    }

    // Off animation
    function imageAnimationOff() {

      // Main animation
      var imageAnimation = anime({
        targets: animeImage,
        translateX: '0',
        translateY: '0',
        scale: 1,
        marginTop: '0',
        duration: 500,
        easing: 'easeInQuad'
      });

      var bodyAnimation = anime({
        targets: animeContainer,
        scale: 0,
        opacity: '0',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var overlayAnimation = anime({
        targets: overlay,
        opacity: '0',
        duration: 300,
        easing: 'linear'
      });

      // Desktop animation for columns
      if (isDesktop()) {
        animateColumns('remove');
      }

      // Timeout to set style which produce jumping after animation
      setTimeout(function() {

        // Set active state
        animeClick = true;

        // Allow scroll
        body.style.overflowY = 'scroll';

        // Additional anime animations
        animeCol.classList.remove('active');
        animeImage.classList.remove('portrait');

      }, 500);
    }

    // click function on image
    animeImage.addEventListener('click', function(e) {
      if (animeClick) {
        imageAnimationOn();
      } else {
        imageAnimationOff();
      }
    });

    // close function for overlay
    overlay.addEventListener('click', function(e) {
      if (!animeClick) {
        imageAnimationOff();
      }
    });

  }

  // Global functions
  function isPortrait(img) {
    var width = img.width;
    var height = img.height;
    return (height > width);
  }

  function isDesktop() {
    var width = window.innerWidth;
    return (width > 600);
  }

  function animateColumns(action) {
    var columnsContainer = el.closest('.columns-container');
    if (columnsContainer) {
      var parent = columnsContainer.parentNode;
      parent.classList[action]('animate');
      columnsContainer.classList[action]('active');
    }
  }
};
