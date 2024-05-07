apos.utils.widgetPlayers['card-anime'] = function(el, data, options) {

  // Get elements
  var html = document.documentElement;
  var animeCol = el.getElementsByClassName('anime')[0];
  var overlay = el.getElementsByClassName('anime-overlay')[0];
  var animeImage = el.getElementsByClassName('anime-image')[0];
  var animeContainer = el.getElementsByClassName('anime-container')[0];

  // Set states
  var scrollTarget = animeContainer;
  var scale = 0.4;
  var animeClick = true;

  // Anime column fuction for layout widgets
  function animateColumns(action) {
    // Check for columns-containers in widget
    var columnsContainer = el.closest('.columns-container');
    if (columnsContainer) {
      // Get parent of columns-container
      var parent = columnsContainer.parentNode;
      // Add classes to both
      parent.classList[action]('animate');
      columnsContainer.classList[action]('active');
    }
  }

  // On animation
  function imageAnimationOn() {

    // Set active state
    animeClick = false;

    // Activate animeCol
    animeCol.classList.add('active');

    // SBlock scroll
    html.style.overflowY = 'hidden';

    // Get image
    var img = animeImage.getElementsByTagName('img')[0];

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

    // Scroll Element in to View
    scrollToCenter(scrollTarget);

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

      // Allow scroll
      html.style.overflowY = 'scroll';

      // Additional anime animations
      animeCol.classList.remove('active');
      animeImage.classList.remove('portrait');

      // Set active state
      animeClick = true;

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

  // Close function for overlay
  overlay.addEventListener('click', function(e) {
    if (!animeClick) {
      imageAnimationOff();
    }
  });

};
