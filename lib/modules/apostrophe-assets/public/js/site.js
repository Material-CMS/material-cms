$(function() {
  // Start with your project-level client-side javascript here.
  // JQuery and lodash (_) are both included with Apostrophe, so no need to
  // worry about including them on your own.

  //Navigation
  $(document).on("scroll", onScroll);
  //Smoothscroll
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      //Add active classes on click
      $('a').each(function () {
          $(this).parent('li').removeClass('active');
      })
      $(this).parent('li').addClass('active');
      //Jump to section
      var target = this.hash,
          menu = target;
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top+2
      }, 500, 'swing', function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
      });
  });

  //Scroll listener
  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav-activator li a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              currLink.parent('li').addClass("active");
              //Get hash and Replace it (just modern Browsers! need to add workourung for IE)
              var target = this.hash;
              history.replaceState(null, null, target );
          }
          else{
            currLink.parent('li').removeClass("active");
          }
      });
  }

  // Fullpage Scroll Options, Init
  //Options passing to Smartscroll
  var options = {
    mode: "set", // "vp", "set"
    autoHash: false,
    sectionScroll: true,
    initialScroll: true,
    keepHistory: false,
    sectionWrapperSelector: ".section-wrapper",
    sectionClass: "section",
    animationSpeed: 400,
    headerHash: null,
    breakpoint: "400px",
    eventEmitter: null,
    dynamicHeight: true,
    bindSwipe: true
  };

  //Initialisation
  $.smartscroll(options);

//End of $(function()
});
