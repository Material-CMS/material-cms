apos.utils.widgetPlayers['footer'] = function(el, data, options) {

  // Initialize materialize modal
  var modals = el.querySelectorAll('.modal');
  for (var i = 0; i < modals.length; i++) {
    M.Modal.init(modals[i]);
  }

};
