apos.utils.widgetPlayers['navigations'] = function(el, data, options) {

  // Initialize Materialize Parallax
  var parallax = el.querySelectorAll('.parallax');
  for (var i = 0; i < parallax.length; i++) {
    M.Parallax.init(parallax[i]);
  }

  // Initialize Materialize Dropdown
  var dropdowns = el.querySelectorAll('.dropdown-trigger')
  for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      constrainWidth: false,
      closeOnClick: true,
      coverTrigger: false,
      hover: false
    });
  }

  // Initialize Materialize Dropdown Hover
  var dropdowns = el.querySelectorAll('.dropdown-trigger-hover')
  for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      constrainWidth: false,
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

  // Smooth scroll to anchor
  function scrollToAnchor(anchor) {
    var target = anchor.hash;
    var targetElement = document.getElementById(target.substring(1));
    var targetOffset = targetElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    if (window.scrollTo) {
      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
    } else {
      window.scroll(0, targetOffset);
    }
    // Set anchor active and push state
    setInterval(function() {
      setActiveLinkForScrollPosition();
    }, 250);
  }

  // Set active link for scroll position
  function setActiveLinkForScrollPosition() {
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var anchorScrollLinks = document.querySelectorAll('.anchor-scroll');
    var activeLinkFound = false;
    for (var i = 0; i < anchorScrollLinks.length; i++) {
      var link = anchorScrollLinks[i];
      var target = link.hash;
      var refElement = document.getElementById(target.substring(1));
      if (refElement.offsetTop <= scrollPos + 200 && refElement.offsetTop + refElement.offsetHeight > scrollPos + 200) {
        if (!activeLinkFound) {
          activeLinkFound = true;
          link.parentNode.classList.add('active');
          if (history.replaceState) {
            history.replaceState(null, null, target);
          }
        } else {
            link.parentNode.classList.remove('active');
        }
      } else {
          link.parentNode.classList.remove('active');
      }
    }
  }

  // Add click handler to anchor links
  var anchorJumpLinks = document.querySelectorAll('.anchor-jump[href^="#"]');
  for (var i = 0; i < anchorJumpLinks.length; i++) {
    var anchor = anchorJumpLinks[i];
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToAnchor(this);
    });
  }

  // Add scroll handler to update active link
  var scrolling = false;
  window.addEventListener('wheel', function() {
    scrolling = true;
  });

  // Throttling function to prevent browser flooding
  setInterval(function() {
    if (scrolling) {
      scrolling = false;
      setActiveLinkForScrollPosition();
    }
  }, 1000);

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
