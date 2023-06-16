apos.utils.widgetPlayers['card'] = function(el, data, options) {

  if (data.clickAction == 'clickActionAnime') {

    // Get elements
    var body = document.querySelector('body');
    var nav = document.querySelector('.nav-wrapper')
    var sectionHeader = document.querySelectorAll('.section-header');
    var aposUiElements = el.querySelectorAll('.apos-ui');
    var animeCol = el.querySelector('.anime');
    var overlay = el.querySelector('.anime-overlay');
    var animeImage = el.querySelector('.anime-image');
    var animeContainer = el.querySelector('.anime-container');
    var cardContent = animeContainer.querySelector('.card-content');

    // Set active state
    var isActive = true;

    // On animation
    function imageAnimationOn() {

      // Set active state
      isActive = false;

      // Get elements
      var columns = getParent(el, 4)
      var columnsContainer = getParent(el, 3)
      var img = animeImage.querySelector('img');

      // Add pre-animation styles
      // body.style.overflowY = 'hidden';
      for (var i = 0; i < sectionHeader.length; i++) {
        sectionHeader[i].style.opacity = '0';
      }

      // Add active classes to elements
      columns.classList.add('animate');
      columnsContainer.classList.add('active');
      animeCol.classList.add('active');

      // Check image orientation
      if (isPortrait(img)) {
        animeCol.classList.add('portrait');
      }

      // TODO: Add smooth scroll polyfill
      // https://www.npmjs.com/package/smoothscroll-polyfill
      el.scrollIntoView({
          behavior: 'auto',
          block: 'center'
      });

      // Main animation
      setTimeout(function() {

        var imageAnimation = anime({
          targets: animeImage,
          translateY: ['0%', '-100%'],
          translateX: ['0%', '10%'],
          scale: 0.3,
          marginTop: '40px',
          duration: 500,
          easing: 'easeInOutQuad'
        });

        var bodyAnimation = anime({
          targets: animeContainer,
          scale: 1,
          opacity: '1',
          duration: 500,
          easing: 'easeInOutQuad'
        });

        var navAnimation = anime({
          targets: nav,
          opacity: '0',
          duration: 500,
          easing: 'linear'
        });

        var overlayAnimation = anime({
          targets: overlay,
          opacity: '1',
          duration: 300,
          easing: 'linear'
        });

        var animeColAnimation = anime({
          targets: animeCol,
          marginTop: '10%',
          duration: 500,
          easing: 'easeInOutQuad'
        });
      }, 100);

      // Timeout to set style which produce jumping after animation
      setTimeout(function() {
        nav.style.display = 'none';
      }, 400);
    }

    // Off animation
    function imageAnimationOff() {

      // Show Nav
      nav.style.display = 'block';

      // Check for columns-container on package
      var columns = getParent(el, 4)
      var columnsContainer = getParent(el, 3)

      // Remove active class from columns-container
      columns.classList.remove('animate');
      columnsContainer.classList.remove('active');

      // Main animation
      var imageAnimation = anime({
        targets: animeImage,
        translateX: '0',
        translateY: '0',
        scale: 1,
        marginTop: '0',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var bodyAnimation = anime({
        targets: animeContainer,
        scale: 0,
        translateY: '0',
        opacity: '0',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var navAnimation = anime({
        targets: nav,
        opacity: '1',
        duration: 600,
        easing: 'linear'
      });

      var overlayAnimation = anime({
        targets: overlay,
        opacity: '0',
        duration: 300,
        easing: 'linear'
      });

      var animeColAnimation = anime({
        targets: animeCol,
        marginTop: '0',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      // Timeout to set style which produce jumping after animation
      setTimeout(function() {
        isActive = true;
        body.style.overflowY = 'scroll';
        animeCol.classList.remove('active');
        animeCol.classList.remove('portrait');
        for (var i = 0; i < sectionHeader.length; i++) {
          sectionHeader[i].style.opacity = '1';
        }
      }, 500);
    }

    // click function on image
    animeImage.addEventListener('click', function(e) {
      if (isActive) {
        imageAnimationOn();
      } else {
        imageAnimationOff();
      }
    });

    // close function for overlay
    overlay.addEventListener('click', function(e) {
      if (!isActive) {
        imageAnimationOff();
      }
    });

    // Get parent of element
    function getParent(element, num) {
      var parent = element;
      for (var i = 0; i < num; i++) {
        if (parent.parentNode) {
          parent = parent.parentNode;
        }
      }
      return parent;
    }

    // Get image orientation
    function isPortrait(img) {
      var width = img.width;
      var height = img.height;
      return (height > width);
    }

  }
};
