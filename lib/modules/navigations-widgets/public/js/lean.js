apos.utils.widgetPlayers['navigations'] = function(el, data, options) {

  // Initialize Materialize Parallax
  var parallax = el.querySelectorAll('.parallax');
  for (var i = 0; i < parallax.length; i++) {
    M.Parallax.init(parallax[i], {
      // example-option: true
    });
  }

  // Initialize Materialize Dropdown
  var dropdowns = el.querySelectorAll('.dropdown-trigger')
  for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      closeOnClick: true,
      coverTrigger: false,
      hover: false
    });
  }

  // Initialize Materialize Dropdown Hover
  var dropdowns = el.querySelectorAll('.dropdown-trigger-hover')
  for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      coverTrigger: false,
      hover: true
    });
  }

  // Initialize Materialize Sidenav
  var sidenav = el.querySelectorAll('.sidenav');
  for (var i = 0; i < sidenav.length; i++) {
    M.Sidenav.init(sidenav[i], {
      draggable: true,
      preventScrolling: true
    });
  }

  // Materialize pushpin init
  var pushpin = document.querySelectorAll('.nav-pushpin');
  for (var i = 0; i < pushpin.length; i++){
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var elemRect = pushpin[i].getBoundingClientRect();
    var parentRect = pushpin[i].parentElement.getBoundingClientRect();
    var elemTop = scrollTop + elemRect.top;
    M.Pushpin.init(pushpin[i], {
      top: elemTop
    });
  }

  // Scroll anchor jump and scroll anchors with jquery
  // TODO Need conversion to pure js
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

  // Navigation color checker
  if (!data.navTextColor) {
     var navigations = el.querySelectorAll('.nav-wrapper, .sidenav');
     for (var i = 0; i < navigations.length; i++) {
       var navColor, brightness, r, g, b, hsp;
       navColor = getComputedStyle(navigations[i], null).getPropertyValue('background-color');
       brightness = lightOrDark(navColor);
       if(brightness == 'dark') {
         navigations[i].classList.add('dark-background');
       }
       else {
         navigations[i].classList.add('light-background');
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
   }

};
