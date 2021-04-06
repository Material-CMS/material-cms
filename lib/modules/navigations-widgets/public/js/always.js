apos.define('navigations-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Parallax
      var parallax = $widget.find('.parallax');
      if (parallax.length) {
        parallax.parallax();
      }

      // Initialize Materialize Dropdown
      var dropdown = $widget.find('.dropdown-trigger');
      if (dropdown.length) {
        dropdown.dropdown({
          closeOnClick: true,
          coverTrigger: false,
          hover: false
        });
      }

      // Initialize Materialize Dropdown Hover
      var dropdownHover = $widget.find('.dropdown-trigger-hover');
      if (dropdownHover.length) {
        dropdownHover.dropdown({
          coverTrigger: false,
          hover: true
        });
      }

      // Initialize Materialize Sidenav
      var sidenav = $widget.find('.sidenav');
      if (sidenav.length) {
        sidenav.sidenav({
          draggable: true,
          preventScrolling: true
        });
      }

      // Materialize pushpin init
      var nav = $widget.find('.nav-pushpin');
      if (nav.length) {
        nav.pushpin({
          top: nav.offset().top,
        });
      }
    };
  }
});
