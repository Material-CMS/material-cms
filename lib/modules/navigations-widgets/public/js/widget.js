apos.utils.widgetPlayers['navigations'] = function(el, data, options) {

  // Initialize Materialize Parallax
  var parallax = el.querySelector('.parallax');
  if (parallax) {
    M.Parallax.init(parallax);
  }

  // Initialize Materialize Dropdown
  var dropdowns = el.querySelectorAll('.dropdown-trigger');
  if (dropdowns) {
    for (var i = 0; i < dropdowns.length; i++){
      M.Dropdown.init(dropdowns[i], {
        constrainWidth: false,
        closeOnClick: true,
        coverTrigger: false,
        hover: false
      });
    }
  }

  // Initialize Materialize Dropdown Hover
  var dropdownsHover = el.querySelectorAll('.dropdown-trigger-hover');
  if (dropdownsHover) {
    for (var i = 0; i < dropdownsHover.length; i++){
      M.Dropdown.init(dropdownsHover[i], {
        constrainWidth: false,
        coverTrigger: false,
        hover: true
      });
    }
  }

  // Initialize Materialize Sidenav
  var sidenav = el.querySelector('.sidenav');
  if (sidenav) {
    M.Sidenav.init(sidenav, {
      draggable: true,
      preventScrolling: true
    });
  }

  // Materialize pushpin init
  var pushpin = el.querySelector('.nav-pushpin');
  if (pushpin) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var elemRect = pushpin.getBoundingClientRect();
    var parentRect = pushpin.parentElement.getBoundingClientRect();
    var elemTop = scrollTop + elemRect.top;
    M.Pushpin.init(pushpin, {
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

  // Add scroll handler to update active link
  window.addEventListener('scroll', _.throttle(function() {
    setActiveLinkForScrollPosition();
  }, 500));

  // Navigation color check
  if (!data.navTextColor) {
    var colorFields = el.querySelectorAll('.nav-wrapper, .sidenav');
    for (var i = 0; i < colorFields.length; i++) {
      applyBackgroundColorClass(colorFields[i]);
    }
  }
};
