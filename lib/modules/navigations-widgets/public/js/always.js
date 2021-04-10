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

      // Anchor jump with scroll anchors
      $('.anchor-jump[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          var target = this.hash;
          var $target = $(target);
          $('html, body').stop().animate({
              'scrollTop': $target.offset().top+2
          }, 300, 'swing', function () {
              window.location.hash = target;
          });
      });

      // Set anchors when scroll
      var scrolling = false;
      $( window ).scroll( function() {
          scrolling = true;
      });

      // Throtteling function to prevent brwoser flooding
      setInterval( function() {
          if ( scrolling ) {
          scrolling = false;
          var scrollPos = $(document).scrollTop();
            $('.anchor-scroll').each(function () {
              var target = this.hash;
              var currLink = $(this);
              var refElement = $(currLink.attr("href"));
              if (refElement.position().top < scrollPos + 200 && refElement.position().top + refElement.height() > scrollPos + 200 ) {
                  currLink.parent('li').addClass("active");
                  // Check pathname to cut down the number of history state changes
                  if (window.location.pathname !== target) {
                    // Get hash and Replace it for modern browsers
                    if(history.pushState) {
                        history.pushState(null, null, target);
                    }
                    // Fallback for older browsers
                    else {
                        location.hash = target;
                    }
                  }
              }
              else {
                 currLink.parent('li').removeClass("active");
              }
            });
          }
      }, 500 );
      
    };
  }
});
