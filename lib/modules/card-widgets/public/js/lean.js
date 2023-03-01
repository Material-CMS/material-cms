apos.utils.widgetPlayers['card'] = function(el, data, options) {

  if (data.clickAction == 'clickActionAnime') {
    // Get elements
    var body = document.querySelector('body');
    var navElements = document.querySelectorAll('.brand-logo, .sidenav-trigger, .nav-activator')
    var sectionHeader = document.querySelectorAll('.section-header');
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
      overlay.style.cssText = 'display: block; opacity: 1;';
      animeCol.classList.add('active');
      for (var i = 0; i < sectionHeader.length; i++) {
        sectionHeader[i].style.opacity = '0';
      }

      // TODO: Add smooth scroll polyfill
      // https://www.npmjs.com/package/smoothscroll-polyfill
      el.scrollIntoView({
          behavior: 'auto',
          block: 'center'
      });

      // Calculate proportions
      function round(value, decimals) {
          return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
      }

      setTimeout(function() {
        var imageAnimation = anime({
          targets: animeImage,
          translateY: ['0%', '-100%'],
          translateX: ['0%', '10%'],
          scale: 0.3,
          duration: 500,
          easing: 'easeInOutQuad'
        });

        var bodyAnimation = anime({
          targets: animeContainer,
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
      }, 100);
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
        animeCol.classList.remove('active');
        for (var i = 0; i < sectionHeader.length; i++) {
          sectionHeader[i].style.opacity = '1';
        }
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
