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

      // materialize pushpin init
      var nav = $widget.find('.nav-pushpin');
      if (nav.length) {
        nav.pushpin({
          top: nav.offset().top,
        });
      }

      // anchor jump with scroll anchors
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

      // set anchors when scroll
      var scrolling = false;
      $(window).scroll( function() {
          scrolling = true;
      });

      // throtteling function to prevent browser flooding
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
                  // check pathname to cut down the number of history state changes
                  if (window.location.pathname !== target) {
                    // get hash and Replace it for modern browsers
                    if(history.pushState) {
                        history.pushState(null, null, target);
                    }
                    // fallback for older browsers
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

      // Navigation color checker jquery version
      var navigations = $widget.find('.nav-color');
      if (navigations.length) {
        var bgColor, brightness, r, g, b, hsp;
        bgColor = $(navigations).css('background-color');
        brightness = lightOrDark(bgColor);
        if(brightness == 'dark') {
          $(navigations).addClass('dark-background');
        }
        else {
          $(navigations).addClass('light-background');
        }
        function lightOrDark(color) {
          if (color.match(/^rgb/)) {
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            r = color[1];
            g = color[2];
            b = color[3];
          }
          else {
            color = +("0x" + color.slice(1).replace(
              color.length < 5 && /./g, '$&$&'
            ));
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
          }
          hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
          );
          if (hsp>127.5) {
            return 'light';
          }
          else {
            return 'dark';
          }
        };
      }

    };
  }
});
