$(function() {
  // Start with your project-level client-side javascript here.
  // JQuery and lodash (_) are both included with Apostrophe, so no need to
  // worry about including them on your own.

    // If window size smaller than 400 execure fullpage scroll function
    var windowWidth = $(window).width();
    if(windowWidth > 400){

      // Much THX to https://codepen.io/Adasinho/pen/zjEprR
      // global variables
      var selected_dot = [];
      var last_select = 0;
      var sections = $('.section-wrapper .section');

      // call only once, create navigtion dots
      var start = (function() {
          var executed = false;
          return function() {
              if (!executed) {
                  executed = true;

                  var i;
                  for(i = 0; i < sections.length; i++) {
                      var dotId = $(sections[i]).attr('id') + "-dot";
                      jQuery('<div/>', {
                          id: dotId,
                          class: "dot"
                      }).appendTo('#navigator');

                      $('#' + dotId).append('<i class="fas fa-circle"></i>');

                      if(i == 0) {
                          $('#' + dotId).addClass("selected");
                      } else {
                          $('#' + dotId).addClass("not-selected");
                      }

                      selected_dot.push(false);
                  }

                  selected_dot[0] = true;
              }
          };
      })();

      start();

      function chooseTarget(newTarget) {
          var dotId = $(sections[last_select]).attr('id') + "-dot";

          $('#' + dotId).removeClass("selected");
          $('#' + dotId).addClass("not-selected");

          last_select = newTarget;
          dotId = $(sections[last_select]).attr('id') + "-dot";

          $('#' + dotId).removeClass("not-selected");
          $('#' + dotId).addClass("selected");
      }

      function clickedTarget(target) {
          var i;
          for(i = 0; i < sections.length; i++) {
              if($(sections[i]).attr('id') == target.attr('id')) {
                  if(i != last_select) {
                      chooseTarget(i);
                      break;
                  }
              }
          }
      }

      function scrollTarget(deltaY) {
          if(deltaY > 0) { // scrolling down
              if(last_select + 1 == sections.length) {

              } else chooseTarget(last_select + 1);
          }

          if(deltaY < 0) { // scrolling up
              if(last_select - 1 == -1) {

              } else chooseTarget(last_select - 1);
          }
      }

      function animateToTarget(target,speed) {
          // Only prevent default if animation is actually gonna happen
          //event.preventDefault();

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
          if(!$('html, body').is(':animated')) {
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

//End of $(function()
});
