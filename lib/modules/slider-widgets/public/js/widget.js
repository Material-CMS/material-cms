apos.utils.widgetPlayers['slider'] = function(el, data, options) {

  // Global variables
  var swiperWrapper = el.getElementsByClassName('swiper-wrapper')[0];
  var swiperContainer = el.getElementsByClassName('swiper-container')[0];

  // Swiper initialization
  var mySwiper = new Swiper(swiperContainer, {
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
    pagination: {
      el: '.swiper-pagination',
      type: data.paginationType,
      clickable: true
    }
  });

};
