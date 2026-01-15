apos.utils.widgetPlayers['texts'] = function(el, data, options) {

  // Initialize Materialize Collapsibles
  var collapsibles = el.querySelectorAll('.collapsible');
  if (data.collapse) {
    for (var i = 0; i < collapsibles.length; i++) {
      // Initialize collapsibles with special collapsed class function
      M.Collapsible.init(collapsibles[i], {
        onOpenEnd: function(el) {
          el.parentNode.previousElementSibling.classList.add('collapsed');
        },
        onCloseStart: function(el) {
          el.parentNode.previousElementSibling.classList.remove('collapsed');
        },
        outDuration: 500
      });
    }
  } else {
    for (var i = 0; i < collapsibles.length; i++) {
      // Initialize default collapsibles
      M.Collapsible.init(collapsibles[i]);
    }
  }

  // Call the function initially
  // TODO: wrap this in an if condition based on the `backColor` of the actual piece,
  // but this util only can get the data of the widget
  var colorField = el.getElementsByClassName('card-stacked')[0];
  if (colorField) {
    applyBackgroundColorClass(colorField);
  }
};
