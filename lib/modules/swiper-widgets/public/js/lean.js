apos.utils.widgetPlayers['swiper'] = function(el, data, options) {
  // Utilize the provided `data` (properties of the widget)
  // and `options` (options passed to the singleton or area for
  // this widget) to enhance `el`, a DOM element representing the widget
  var swiper = new Swiper(el.querySelector('.swiper-container'), {
    loop: data.loop,
    speed: data.speed,
    autoHeight: data.autoHeight,
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
    }
  });
};
