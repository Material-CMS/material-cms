$(function() {
    'use strict';
    // Navigation click function jumps to clicked section
    $('.anchor[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 300, 'swing', function () {
            window.location.hash = target;
        });
    });

    // Scroll down button jumps to next section
    $('.scroll-down').click(function(){
          var nextSection = $(this).closest('.section').next('.section');
          $('html, body').animate({
             scrollTop: $(nextSection).offset().top
          }, 300);
    });

    // Show button when more than one section
    $('.section-wrapper').each(function() {
      if ($(this).find('.section').length > 1) {
        $('.scroll-down').show();
      }
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
          $('.anchor').each(function () {
            var target = this.hash;
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
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
    }, 250 );

//End of $(function()
});
