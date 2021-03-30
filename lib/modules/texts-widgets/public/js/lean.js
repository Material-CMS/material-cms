apos.utils.widgetPlayers['texts'] = function(el, data, options) {
  // Initialize Materialize Collapsible
  var collapsibles = el.querySelectorAll('.collapsible');
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i], {
      // example-option: true
    });
  }
};
