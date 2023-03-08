apos.utils.widgetPlayers['card'] = function(el, data, options) {

  // Initialize Materialbox
  var materialboxes = el.querySelectorAll('.materialboxed');
  for (var i = 0; i < materialboxes.length; i++) {
    M.Materialbox.init(materialboxes[i]);
  }

  if (data.clickAction == 'clickActionAnime') {
    // Get elements
    var body = document.querySelector('body');
    var nav = document.querySelector('.nav-wrapper')
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
      body.style.overflowY = 'hidden';
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
          duration: 500,
          easing: 'easeInOutQuad'
        });

        var navAnimation = anime({
          targets: nav,
          opacity: '0',
          duration: 250,
          easing: 'easeInOutQuad'
        });
      }, 100);

      setTimeout(function() {
        nav.style.display = 'none';
      }, 600);

    }
    function imageAnimationOff() {

      nav.style.display = 'block';

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
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var navAnimation = anime({
        targets: nav,
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
    // close function for overlay
    overlay.addEventListener('click', function(e) {
      if (!isActive) {
        imageAnimationOff();
        console.log("off!!!")
      }
    });
  }
};
