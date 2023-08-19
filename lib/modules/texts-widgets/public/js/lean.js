apos.utils.widgetPlayers['texts'] = function(el, data, options) {

  // Initialize Materialize Collapsibles
  var collapsibles = el.querySelectorAll('.collapsible');
  if (collapsibles) {
    // Loop trough all elements
    for (var i = 0; i < collapsibles.length; i++) {
      // Check if 'animeContainer' is given by apos.area
      if (options.animeContainer) {
        // Initialize Collapsibles with special fucntions
        M.Collapsible.init(collapsibles[i], {
          inDuration: 400,
          onOpenEnd: function(el) {
            var cardContent = el.parentNode.previousElementSibling;
            cardContent.classList.add('collapsed');
          },
          onCloseStart: function(el) {
            var cardContent = el.parentNode.previousElementSibling;
            cardContent.classList.remove('collapsed');
          },
          outDuration: 500
        });
      } else {
        // Initialize Collapsibles with default settings
        M.Collapsible.init(collapsibles[i]);
      }
    }
  }

  // Call the function initially
  // TODO: wrap this in an if condition based on the `backColor` of the actual piece,
  // but this util only can get the data of the widget
  applyBackgroundColorClass('.card-stacked');
};
