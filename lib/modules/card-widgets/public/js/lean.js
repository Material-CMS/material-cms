apos.utils.widgetPlayers['card'] = function(el, data, options) {
  
  // Ge elements
  var body = document.querySelector('body');
  var navElements = document.querySelectorAll('.brand-logo, .sidenav-trigger')
  var sectionHeader = document.querySelector('.section-header');
  var animeImage = el.querySelector('.anime-image');
  var animeContainer = el.querySelector('.anime-container');
  var cardContent = el.querySelector('.anime-container .card-content');
  var overlay = el.querySelector('.anime-overlay');

  // Set active state
  var isActive = true;
  function imageAnimationOn() {
    isActive = false;
    body.style.overflowY = 'hidden';
    cardContent.style.paddingTop = '5rem';
    sectionHeader.style.opacity = '0';
    overlay.style.display = 'block';
    // Hide nav elements
    for (var i = 0; i < navElements.length; i++) {
      navElements[i].style.display = 'none';
    }
    // Scroll image into view
    var imageRect = document.querySelector('.anime-image').getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var scrollY = imageRect.top + (imageRect.height / 2) - (viewportHeight / 2);
    window.scroll({
      top: scrollY,
      behavior: 'smooth'
    });

    var imageAnimation = anime({
      targets: animeImage,
      scale: 0.5,
      translateX: '-40vw',
      translateY: '-40vh',
      duration: 500,
      easing: 'easeInOutQuad'
    });

    var bodyAnimation = anime({
      targets: animeContainer,
      translateY: '-40vh',
      scale: 1,
      duration: 500,
      easing: 'easeInOutQuad'
    });
  }
  function imageAnimationOff() {
    isActive = true;
    var imageAnimation = anime({
      targets: animeImage,
      scale: 1,
      translateX: '0',
      translateY: '0',
      duration: 500,
      easing: 'easeInOutQuad'
    });

    var bodyAnimation = anime({
      targets: animeContainer,
      scale: 0,
      translateY: '0',
      duration: 500,
      easing: 'easeInOutQuad'
    });

    setTimeout(function() {
      overlay.style.display = 'none';
      body.style.overflowY = 'scroll';
      cardContent.style.paddingTop = '';
      sectionHeader.style.opacity = '1';
      // Show nav elements
      for (var i = 0; i < navElements.length; i++) {
        navElements[i].style.display = '';
      }
    }, 500);
  }

  // click function on Image
  document.addEventListener('click', function(e) {
    if (isActive) {
      imageAnimationOn()
    } else {
      imageAnimationOff()
    }
  });
};
