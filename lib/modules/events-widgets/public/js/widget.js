apos.utils.widgetPlayers['events'] = function(el, data, options) {
  // Initialize Materialize Floating Action Button
  var collapsible = M.Collapsible.init(el.querySelector('.collapsible'), {
    accordion: data.accordion
  });
};
