apos.utils.widgetPlayers['sections'] = function(el, data, options) {
  // Initialize Materialize Parallax
  var parallax = el.querySelectorAll('.parallax');
  for (var i = 0; i < parallax.length; i++) {
    M.Parallax.init(parallax[i], {
      // example-option: true
    });
  }
};
