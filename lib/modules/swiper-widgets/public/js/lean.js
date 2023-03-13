apos.utils.widgetPlayers['swiper'] = function(el, data, options) {

  // Swiper initialization
  var swiper = new Swiper(el.querySelector('.swiper-container'), {
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
