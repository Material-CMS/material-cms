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

      // if (isPortrait) {
      //   var x = Math.max(width - 375, 0);
      //   scale = 0.3 + (1 - 0.3) * x / 16000;
      //   console.log(scale);
      //   translateY = (15 + width / 10) + (1 - x / 2625) * 5;
      // } else {
      //   scale = Math(width - 375, 0);
      //   console.log(scale);
      //   translateY = (-40 - width / 2) + (1 - x / 3050) * 15;
      // }

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

      setTimeout(function() {
        isActive = true;
        overlay.style.display = 'none';
        body.style.overflowY = 'scroll';
        cardContent.style.paddingTop = '';
        sectionHeader.style.opacity = '1';
        animeCol.classList.remove('active');
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
