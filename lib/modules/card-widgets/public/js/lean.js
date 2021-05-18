apos.utils.widgetPlayers['card'] = function(el, data, options) {
  // Initialize image expand
  var expand = el.querySelectorAll('.expand-init');
  for (var i = 0; i < expand.length; i++) {
    // Jquery workaround cause the whole function is written in jquery
    // need to rewirte whole expand.js to pure javascript
    // then the function can be initiaized in javascript only
    $(expand[i]).expand();
  }
};
