$(function() {
  // Start with your project-level client-side javascript here.
  // JQuery and lodash (_) are both included with Apostrophe, so no need to
  // worry about including them on your own.

    $(document).on("scroll", onScroll);

    // Navigation click function jumps to clicked section
    $('.anchor[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });


    // Set anchors when scroll
    function onScroll(event){
      var scrollPos = $(document).scrollTop();
        $('.anchor').each(function () {
            var target = this.hash;
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                currLink.parent('li').addClass("active");
                // Get hash and Replace it (bleeding edge! need to add workourung for IE)
                  history.replaceState(null, null, target );
            }
            else {
               currLink.parent('li').removeClass("active");
            }
        });
    }

//End of $(function()
});
