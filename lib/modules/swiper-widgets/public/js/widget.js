apos.utils.widgetPlayers['swiper'] = function(el, data, options) {

  // Swiper-wrapper uses transform for its animations but lightbox effect uses position: fixed,
  // which is not working together. This is a know css bug:
  // https://dev.to/salilnaik/the-uncanny-relationship-between-position-fixed-and-transform-property-32f6
  // To get workaround this tranform needs to be temorary replaced with left property

  var swiperContainer = el.getElementsByClassName('swiper-container')[0];
  var swiperWrapper = el.getElementsByClassName('swiper-wrapper')[0];
  var swiperSlides = el.getElementsByClassName('swiper-slide');
  for (var i = 0; i < swiperSlides.length; i++) {

    var lightbox = swiperSlides[i].getElementsByClassName('lightbox')[0];

    if (lightbox) {

      var swiperWrapperLeft = false;
      lightbox.addEventListener('click', function(e) {
        var wiperWrapperPosition;
        if (!swiperWrapperLeft) {
          var { x, y, z } = getTranslateValues(swiperWrapper);
          swiperWrapper.style.transform = 'none';
          swiperWrapper.style.left = x+'px';
          swiperWrapperLeft = true;
          swiperWrapperPosition = x;
          setTimeout(function() {
            swiperContainer.style.zIndex = '99';
          }, 400);
        } else {
          swiperContainer.style.zIndex = null;
          setTimeout(function() {
            swiperWrapper.style.transform = 'translate3d('+swiperWrapperPosition+'px'+', 0px, 0px)';
            swiperWrapper.style.left = null;
            swiperWrapperLeft = false;
          }, 400);
        }
      });
    }
  }

  // Overflow radius override
  if (data.overflow) {
     var radius = el.getElementsByClassName('radius')[0];
     radius.classList.add('overflow-visible');
     swiperContainer.classList.add('overflow-visible');
  }

  // Swiper initialization
  var swiper = new Swiper(el.querySelector('.swiper-container'), {
    slidesPerView: data.overflow ? 'auto' : data.slidesPerView ,
    spaceBetween: 20,
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
    }
  });

};
