apos.define('navigations-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Parallax
      var parallax = $widget.find('.parallax');
      for (var i = 0; i < parallax.length; i++) {
        M.Parallax.init(parallax[i], {
          // example-option: true
        });
      }
      // Initialize Materialize Pushpin
      var pushpin = $widget.find('.pushpin');
      for (var i = 0; i < pushpin.length; i++) {
        M.Pushpin.init(pushpin[i], {
          // example-option: true
        });
      }
      // Initialize Materialize Dropdown
      var dropdowns = $widget.find('.dropdown-trigger')
      for (var i = 0; i < dropdowns.length; i++){
        M.Dropdown.init(dropdowns[i], {
          closeOnClick: false,
          coverTrigger: false,
          hover: false
        });
      }
      // Initialize Materialize Dropdown Hover
      var dropdowns = $widget.find('.dropdown-trigger-hover')
      for (var i = 0; i < dropdowns.length; i++){
        M.Dropdown.init(dropdowns[i], {
          coverTrigger: false,
          hover: true
        });
      }
      // Initialize Materialize Sidenav
      var sidenav = $widget.find('.sidenav');
      for (var i = 0; i < sidenav.length; i++) {
        M.Sidenav.init(sidenav[i], {
          draggable: true,
          preventScrolling: true
        });
      }
      // Materialize pushpin init
      var nav = $('.nav-pushpin');
      if (nav.length) {
        nav.pushpin({
          top: nav.offset().top,
        });
      }
    };
  }
});
