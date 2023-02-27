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
      animeCol.classList.add('active');



      var positionInfo = animeImage.getBoundingClientRect();
      var height = positionInfo.height;
      var width = positionInfo.width;
      var isPortrait = height > width;
      // var translateY = isPortrait ? '10rem' : '-20rem';
      // var scale, translateX, translateY;

      // var optimalValues = [
      //   { screenWidth: 1920, translateY: -38 },
      //   { screenWidth: 1800, translateY: -30 },
      //   { screenWidth: 1600, translateY: -40 },
      //   { screenWidth: 1400, translateY: -42 },
      //   { screenWidth: 1200, translateY: -40 },
      //   { screenWidth: 1000, translateY: -50 },
      //   { screenWidth: 500, translateY: -55 },
      //   { screenWidth: 375, translateY: -60 }
      // ];
      //
      // var screenWidth = window.innerWidth;
      // var optimalTranslateY = 0;
      //
      // for (var i = 0; i < optimalValues.length; i++) {
      //   if (screenWidth >= optimalValues[i].screenWidth) {
      //     optimalTranslateY = optimalValues[i].translateY;
      //     break;
      //   }
      // }
      //
      // var m = (optimalTranslateY - optimalValues[optimalValues.length - 1].translateY) / (optimalValues[optimalValues.length - 1].screenWidth - optimalValues[0].screenWidth);
      // var b = optimalTranslateY - m * optimalValues[0].screenWidth;
      // var translateY = m * screenWidth + b;

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
        // animeContainer.style.display = 'none';
      }, 500);
    }

    // click function on Image
    animeImage.addEventListener('click', function(e) {
      if (isActive) {
        imageAnimationOn();
        // TODO: Add smooth scroll polyfill
        // https://www.npmjs.com/package/smoothscroll-polyfill
        animeImage.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
      } else {
        imageAnimationOff();
      }
    });
  }
};
