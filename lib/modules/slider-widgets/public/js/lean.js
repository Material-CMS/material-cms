apos.utils.widgetPlayers['slider'] = function(el, data, options) {
  // Initialize Materialize Slider
  var slides = M.Slider.init(el.querySelector('.slider'), {
    indicators: data.indicators,
    height: 400,
    duration: 500,
    interval: 6000
  });
};
