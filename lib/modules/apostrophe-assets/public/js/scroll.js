$(function() {
    // This is the fullpage scroll mechanism

    // Anchos will be set in pagination.js no matter if Chrome or not
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {

      // Execute nothing right now because of Chrome glitchy behavior!
    } else {

      // If window size smaller than 400 execure fullpage scroll function
      var windowWidth = $(window).width();
      if(windowWidth > 400){

        // Global variables
        var last_select = 0;
        var sections = $('.section-wrapper .section');

        // Choose target for scroll animation
        function chooseTarget(newTarget) {
            last_select = newTarget;
        }

        // Scroll to target
        function scrollTarget(deltaY) {
            if(deltaY > 0) { // scrolling down
                if(last_select + 1 == sections.length) {

                  // Uncomment for Loop scroll!
                  // chooseTarget(0);
                } else chooseTarget(last_select + 1);
            }

            if(deltaY < 0) { // scrolling up
                if(last_select - 1 == -1) {

                //  Uncomment for Loop scroll!
                //  chooseTarget(sections.length-1);
                } else chooseTarget(last_select - 1);
            }
        }

        function animateToTarget(target,speed) {

            // Only prevent default if animation is actually gonna happen
            // event.preventDefault();
            console.log(target);

            $('html, body').animate({
              scrollTop: target.offset().top
            }, speed, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":animated")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
        }
        window.addEventListener('wheel', function(e) {

          // If modal is open no scroll event will trigger
          var $noScroll = $('.modal');

          if (!$('html, body').is(':animated') && !$noScroll.hasClass("open")) {
            if (e.deltaY < 0) {
                scrollTarget(e.deltaY);
                console.log('scrolling up');
            }

            if (e.deltaY > 0) {
                scrollTarget(e.deltaY);
                console.log('scrolling down');
            }

            $('html, body').stop(false,false);
            animateToTarget($(sections[last_select]), 400);
          }
        });

      }
    }
//End of $(function()
});
