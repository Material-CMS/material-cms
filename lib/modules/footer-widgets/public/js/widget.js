apos.utils.widgetPlayers['footer'] = function(el, data, options) {

  // Initialize materialize modal
  var modals = el.querySelectorAll('.modal');
  if (modals) {
    for (var i = 0; i < modals.length; i++) {
      M.Modal.init(modals[i]);
    }
  }

  var colorFields = el.querySelectorAll('.footer, .modal');
  for (var i = 0; i < colorFields.length; i++) {
    applyBackgroundColorClass(colorFields[i]);
  }

};
