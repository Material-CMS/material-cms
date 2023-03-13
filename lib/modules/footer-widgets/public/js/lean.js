apos.utils.widgetPlayers['footer'] = function(el, data, options) {

  // Initialize materialize modal
  var modals = el.querySelectorAll('.modal');
  for (var i = 0; i < modals.length; i++) {
    M.Modal.init(modals[i]);
  }

  // Footer color check
  if (!data.footerTextColor) {
    var colorFields = el.querySelectorAll('.page-footer, .btn-color');
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
  }

};
