apos.utils.widgetPlayers['card-anime'] = function(el, data, options) {

  // Get global elements
  var body = document.querySelector('body');
  var nav = document.querySelector('.nav-content');

  // Get elements
  var animeCol = el.querySelector('.anime');
  var overlay = el.querySelector('.anime-overlay');
  var animeImage = el.querySelector('.anime-image');
  var animeContainer = el.querySelector('.anime-container');
  var cardContent = animeContainer.querySelector('.card-content');

  // Set states
  var scrollTarget = animeContainer;
  var scale = 0.4;
  var animeClick = true;

  // On animation
  function imageAnimationOn() {

    // Set active state
    animeClick = false;

    // Activate animeCol
    animeCol.classList.add('active');

    // SBlock scroll
    body.style.overflowY = 'hidden';

    // Get image
    var img = animeImage.querySelector('img');
    // Check image orientation
    if (isPortrait(img)) {
      animeImage.classList.add('portrait');
    }

    // Desktop animation
    if (isDesktop()) {
      // Change scale
      scale = 0.2;
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

    setTimeout(function() {
      scrollTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
      });
    }, 200);

    // Main animation
    var imageAnimation = anime({
      targets: animeImage,
      translateY: ['0%', '-100%'],
      translateX: ['0%', '10%'],
      scale: scale,
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

  function animateColumns(action) {
    var columnsContainer = el.closest('.columns-container');
    if (columnsContainer) {
      var parent = columnsContainer.parentNode;
      parent.classList[action]('animate');
      columnsContainer.classList[action]('active');

      // Third scroll into view
      // Workaround for column containers who don't want to be centered
      setTimeout(function() {
        scrollTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
      }, 200);
    }
  }
};
