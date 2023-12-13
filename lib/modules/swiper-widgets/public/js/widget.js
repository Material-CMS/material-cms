apos.utils.widgetPlayers['swiper'] = function(el, data, options) {

  // Global variables
  var swiperWrapper = el.getElementsByClassName('swiper-wrapper')[0];
  var swiperContainer = el.getElementsByClassName('swiper-container')[0];
  var lightboxSlide = null;

  // Overflow radius override
  if (data.overflow) {
    var radius = el.getElementsByClassName('radius')[0];
    radius.classList.add('overflow-visible');
  }

  // Swiper initialization
  var mySwiper = new Swiper(swiperContainer, {
    spaceBetween: data.spaceBetween,
    slidesPerView: data.overflow ? 'auto' : data.slidesPerView ,
    loop: data.loop,
    speed: data.speed,
    effect: data.effect,
    cubeEffect: {
      shadow: false,
    },
    autoplay: data.autoplay,
    delay: data.delay,
    disableOnInteraction: data.disableOnInteraction,
    keyboard: {
      enabled: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    on: {
      afterInit: function () {
        var activeSlide = this.slides[this.activeIndex].getElementsByClassName('lightbox')[0];
        for (var i = 0; i < this.slides.length; i++) {
          lightboxSlide = this.slides[i].getElementsByClassName('lightbox')[0];
          if (lightboxSlide && lightboxSlide === activeSlide) {
            // Remove transform from first slide
            swiperWrapper.style.transform = 'none';
          } else if (lightboxSlide) {
            // Set variable lightboxActivated true to stop further activation of ligthbox effect
            lightboxSlide.lightboxActivated = true;
          }
        }
      },
      click: function (event) {
        // Scoll to clicked slide
        this.slideTo(this.clickedIndex);
      }
    }
  });

  // Additional Lightbox Functions
  if (lightboxSlide) {

    // Remove lightbox event listener from previous slide
    mySwiper.on('slideChangeTransitionStart', function () {
      var previousSlideLightbox = this.slides[this.previousIndex].getElementsByClassName('lightbox')[0];
      var previousSlideLightboxImage = previousSlideLightbox.getElementsByClassName('lightbox-image')[0];
      previousSlideLightboxImage.style.cursor = null;
      previousSlideLightbox.replaceWith(previousSlideLightbox.cloneNode(true));
    });

    // Swiper-wrapper uses transform for its animations but lightbox effect uses position: fixed, which is not working together.
    // This is a know css bug: https://dev.to/salilnaik/the-uncanny-relationship-between-position-fixed-and-transform-property-32f6
    // To get around this problem, transform needs to be temorary replaced with left property
    mySwiper.on('slideChangeTransitionEnd', function () {
      var currentSlideLightbox = this.slides[this.realIndex].getElementsByClassName('lightbox')[0];
      var currentSlideLightboxImage = currentSlideLightbox.getElementsByClassName('lightbox-image')[0];
      var clickable = true;
      var x = null;
      // Pass returned values to ligthboxState variable
      var lightboxState = ligthboxEffect(currentSlideLightbox);
      currentSlideLightboxImage.addEventListener('click', function(e) {
        // Check if lightboxState is not active and clickable
        if (!lightboxState.lightboxActive && clickable) {
          clickable = false;
          x = getTranslateValues(swiperWrapper).x;
          swiperWrapper.style.transform = 'none';
          swiperWrapper.style.left = x+'px';
          setTimeout(function() {
            swiperContainer.style.zIndex = '99';
            clickable = true;
          }, 400);
        }
        // Check if lightboxState is active and clickable
        else if (lightboxState.lightboxActive && clickable) {
          clickable = false;
          swiperContainer.style.zIndex = null;
          setTimeout(function() {
            swiperWrapper.style.transform = 'translate3d('+x+'px'+', 0px, 0px)';
            swiperWrapper.style.left = null;
            clickable = true;
          }, 400);
        };

      });

    });
  }

};
