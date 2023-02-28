apos.utils.widgetPlayers['card'] = function(el, data, options) {

  if (data.clickAction == 'clickActionAnime') {
    // Get elements
    var body = document.querySelector('body');
    var navElements = document.querySelectorAll('.brand-logo, .sidenav-trigger, .nav-activator')
    var sectionHeader = document.querySelector('.section-header');
    var aposUiElements = el.querySelectorAll('.apos-ui');
    var animeCol = el.querySelector('.anime');
    var animeImage = el.querySelector('.anime-image');
    var animeContainer = el.querySelector('.anime-container');
    var cardContent = el.querySelector('.anime-container .card-content');
    var overlay = el.querySelector('.anime-overlay');
    // Set active state
    var isActive = true;

    function imageAnimationOn() {
      isActive = false;
      // body.style.overflowY = 'hidden';
      sectionHeader.style.opacity = '0';
      overlay.style.cssText = 'display: block; opacity: 1;';
      animeImage.style.zIndex = '4';
      animeCol.classList.add('active');

      // TODO: Add smooth scroll polyfill
      // https://www.npmjs.com/package/smoothscroll-polyfill
      el.scrollIntoView({
          behavior: 'auto',
          block: 'center'
      });

      // Calculate proportions
      var positionInfo = animeImage.getBoundingClientRect();
      var width = positionInfo.width;
      var height = positionInfo.height;
      var leftOffset = positionInfo.left;
      var isRight = leftOffset > width
      var isPortrait = height > width;

      var scaleFactor = 0.4;
      var maxScaledWidth = window.innerWidth * scaleFactor;
      var aspectRatio = width / height;
      var screenFactor = Math.max(0.4, 1.2 - (window.innerWidth - 375) / (1920 - 375));
      var scale = maxScaledWidth * screenFactor / width;
      var translateY = '-' + height + 'px';
      var translateX = isRight ? (leftOffset + width) / window.innerWidth * 100 : leftOffset / window.innerWidth * 100 ;
      // var translateX = leftOffset / window.innerWidth * 100;
      console.log(isRight);
      console.log(window.innerWidth);
      console.log(leftOffset);
      console.log(width);
      console.log(translateX);

      var imageAnimation = anime({
        targets: animeImage,
        scale: scale,
        translateX: '-' + translateX + 'vw',
        translateY: translateY,
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var bodyAnimation = anime({
        targets: animeContainer,
        scale: 1,
        // translateX: '-50%',
        // translateY: '-50%',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var navAnimation = anime({
        targets: navElements,
        opacity: '0',
        duration: 250,
        easing: 'easeInOutQuad'
      });
    }

    function imageAnimationOff() {

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

      var navAnimation = anime({
        targets: navElements,
        opacity: '1',
        duration: 250,
        easing: 'easeInOutQuad'
      });

      overlay.style.opacity = '0';
      animeCol.classList.remove('active');

      setTimeout(function() {
        isActive = true;
        overlay.style.display = 'none';
        body.style.overflowY = 'scroll';
        cardContent.style.paddingTop = '';
        sectionHeader.style.opacity = '1';
        animeImage.style.zIndex = '';
        // animeImage.style.position = 'relative';
        animeImage.style.width = '100%;';
        // animeContainer.style.display = 'none';
      }, 500);
    }

    // click function on Image
    animeImage.addEventListener('click', function(e) {
      if (isActive) {
        imageAnimationOn();
      } else {
        imageAnimationOff();
      }
    });
  }
};
