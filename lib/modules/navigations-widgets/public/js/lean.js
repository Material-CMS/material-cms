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

  // Helper function to add event listener for old browsers
  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, callback);
    }
  }

  // Anchor jump with scroll anchors
  var anchorJumpLinks = document.querySelectorAll('.anchor-jump[href^="#"]');
  for (var i = 0; i < anchorJumpLinks.length; i++) {
    var anchor = anchorJumpLinks[i];
    addEvent(anchor, 'click', function(e) {
      e.preventDefault();
      removeEvent(window, "scroll", scrollHandler);
      var target = this.hash;
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
      if (history.pushState) {
        history.pushState(null, null, target);
      } else {
        location.hash = target;
      }
    });
  }

  // Set anchors when scroll
  var scrolling = false;
  function scrollHandler() {
    scrolling = true;
  }
  addEvent(window, 'scroll', scrollHandler);

  // Throtteling function to prevent browser flooding
  setInterval(function() {
    if (scrolling) {
      scrolling = false;
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var anchorScrollLinks = document.querySelectorAll('.anchor-scroll');
      for (var i = 0; i < anchorScrollLinks.length; i++) {
        var link = anchorScrollLinks[i];
        var target = link.hash;
        var refElement = document.getElementById(target.substring(1));
        if (refElement.offsetTop <= scrollPos + 200 && refElement.offsetTop + refElement.offsetHeight > scrollPos + 200) {
          link.parentNode.className += " active";
          if (window.location.pathname !== target) {
            if (history.pushState) {
              history.pushState(null, null, target);
            } else {
              location.hash = target;
            }
          }
        } else {
          link.parentNode.className = link.parentNode.className.replace(/\bactive\b/, "");
        }
      }
    }
  }, 500);
  
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
