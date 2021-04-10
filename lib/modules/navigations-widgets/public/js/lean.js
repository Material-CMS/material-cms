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
  var nav = $('.nav-pushpin');
  if (nav.length) {
    nav.pushpin({
      top: nav.offset().top,
    });
  }

  // TODO mage this pure js pushpin inititialization working
  // var pushpin = document.querySelectorAll('.nav-pushpin');
  //   for (var i = 0; i < pushpin.length; i++){
  //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //     var elemRect = pushpin[i].getBoundingClientRect();
  //     var parentRect = pushpin[i].parentElement.getBoundingClientRect();
  //     var elemTop = scrollTop + elemRect.top;
  //
  //     M.Pushpin.init(pushpin[i], {
  //       top: elemTop,
  //       bottom: elemTop + parentRect.height - elemRect.height
  //     });
  //   }

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

};
