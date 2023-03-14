apos.utils.widgetPlayers['button'] = function(el, data, options) {

  // initialize materialize floating action button
  var btn = el.querySelectorAll('.fixed-action-btn');
  for (var i = 0; i < btn.length; i++) {
    M.FloatingActionButton.init(btn[i], {
      hoverEnabled: data.hoverEnabled
    });
  }

  // Button color check
  // if (!data.footerTextColor) {
  //   var colorFields = el.querySelectorAll('.btn-color');
  //   for (var i = 0; i < colorFields.length; i++) {
  //     var bgColor = getComputedStyle(colorFields[i], null).getPropertyValue('background-color');
  //     var brightness = util.lightOrDark(bgColor);
  //     if (brightness == 'dark') {
  //       colorFields[i].classList.add('dark-background');
  //     }
  //     else {
  //       colorFields[i].classList.add('light-background');
  //     }
  //   }
  // }

};
