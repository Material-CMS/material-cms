apos.utils.widgetPlayers['shape-divider-file'] = function(el, data, options) {
  // Inject img as svg
  SVGInject(el.getElementsByClassName('img-svg'));

  var shapeDivider = el.querySelector('.custom-shape-divider.file');
  console.log(shapeDivider);
  var height = shapeDivider.offsetHeight;
  console.log(height);

  // options.height:'100';

};
