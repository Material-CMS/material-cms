$(function() {
    'use strict';

    // $('.nav-extended').each(function() {
    //   var $this = $(this);
    //   var $target = $('#' + $(this).attr('data-target'));
    //   $this.pushpin({
    //     top: $target.offset().top,
    //     bottom: $target.offset().top + $target.outerHeight() - $this.height()
    //   });
    // });

    var nav = $('nav .nav-wrapper');
    if (nav.length) {
      nav.pushpin({
        top: nav.offset().top,
      });

    }

    // Init infiniscroll
    // Much thanks to Gilbert Pellegrom
    // https://github.com/gilbitron/Infiniscroll
    $('.content').infiniscroll({
      navSelector: '.pagination',				// Selector for your static naivgation (this will be hidden)
      nextSelector: '.pagination a.next',		// Selector for the NEXT link (e.g. to page 2)
      loadingSelector: '.loading',			// Selector for the loading element
      pageFragment: '.content',				// Selector for the content you want to extract from the response
      scrollBuffer: 200,						// The scroll amount in px before the bottom of the page that Infiniscroll should start to load the next page
      scrollOnLoad: true,						// Should the window scroll to the position of the newly loaded content (if the user is at the bottom of the page)
      scrollOnLoadDistance: 200,				// The distance to scroll down when new content is loaded,
      scrollOnLoadSpeed: 500,					// The speed to scroll down when new content is loaded
      onInit: function(){},					// Callback after plugin has loaded
      beforeContentLoaded: function(link){},	// Callback before new content is loaded
      afterContentLoaded: function(html){}	// Callback after new content has been loaded
    });

    // Navigation click function jumps to clicked section
    $('.anchor[href^="#"]').on('click', function (e) {
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
          $('.anchor').each(function () {
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
});
