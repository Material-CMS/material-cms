apos.utils.widgetPlayers['texts'] = function(el, data, options) {

  // Initialize Materialize Collapsible
  var collapsibles = el.querySelectorAll('.collapsible');
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i]);
  }

  // Card content color checker
  var colorFields = el.querySelectorAll('.card-stacked, .btn-color');
  for (var i = 0; i < colorFields.length; i++) {
    var bgColor = getComputedStyle(colorFields[i], null).getPropertyValue('background-color');
    var brightness = util.lightOrDark(bgColor);
    if (brightness == 'dark') {
      colorFields[i].classList.add('dark-background');
    }
    else {
      colorFields[i].classList.add('light-background');
    }
  }

};
