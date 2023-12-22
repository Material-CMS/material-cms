apos.utils.widgetPlayers['slider'] = function(el, data, options) {
  // Initialize Materialize Slider
  var slides = M.Slider.init(el.querySelector('.slider'), {
    indicators: data.sliderIndicators,
    interval: data.sliderInterval,
    duration: 500
  });
};
