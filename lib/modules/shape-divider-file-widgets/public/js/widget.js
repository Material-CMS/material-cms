apos.utils.widgetPlayers['shape-divider-file'] = function(el, data, options) {

  // Check image extension
  var imgElement = el.getElementsByClassName('shape-divider-img')[0];
  if (imgElement) {
    // Get img extension
    var src = imgElement.src;
    // Inject img as svg
    if (src.endsWith('.svg')) {
      SVGInject(imgElement);
      var shapeDivider = el.querySelector('.custom-shape-divider.file');
      var height = shapeDivider.offsetHeight;
      // options.height:'100';
    }
  }

};
