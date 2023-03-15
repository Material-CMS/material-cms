apos.utils.widgetPlayers['texts'] = function(el, data, options) {

  // Initialize Materialize Collapsible
  var collapsibles = el.querySelectorAll('.collapsible');
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i]);
  }

  // Call the function initially
  // TODO: wrap this in an if condition based on the `backColor` of the actual piece,
  // but this util only can get the data of the widget
  applyBackgroundColorClass('.card-stacked');

};
