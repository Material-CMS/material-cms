apos.define('swiper-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Notice we never use a global CSS selector - we always
      // "find" inside $widget. Swiper uses the DOM directly, so use
      // [0] to get from the jQuery object to the DOM element
      var swiper = new Swiper($widget.find('.swiper-container')[0], {
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
  }
});
