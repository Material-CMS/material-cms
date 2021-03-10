// Materialize Components get initialized here javascript
// you cann insert component specific options here
// jquery init is also possible look further materialize documentation

$(document).ready(function() {

  // Sidenav
  var sidenavs = document.querySelectorAll('.sidenav');
  for (var i = 0; i < sidenavs.length; i++) {
    M.Sidenav.init(sidenavs[i], {
      draggable: true,
      preventScrolling: true
    });
  }

  // Dropdown
  var dropdowns = document.querySelectorAll('.dropdown-trigger')
  for (var i = 0; i < dropdowns.length; i++){
  	M.Dropdown.init(dropdowns[i], {
      closeOnClick: true,
      coverTrigger: false,
      hover: false
    });
  }

  // Carousel
  var carousels = document.querySelectorAll('.carousel');
  for (var i = 0; i < carousels.length; i++) {
    M.Carousel.init(carousels[i], {
      indicators: true,
      numVisible: 1
    });
  }

  // Collapsibles
  var collapsibles = document.querySelectorAll('.collapsible');
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i], {
    });
  }

  // Modals
  var modals = document.querySelectorAll('.modal');
  for (var i = 0; i < modals.length; i++) {
    M.Modal.init(modals[i], {
      // example-option: true
    });
  }

  // Parallax
  var parallax = document.querySelectorAll('.parallax');
  for (var i = 0; i < parallax.length; i++) {
    M.Parallax.init(parallax[i], {
      // example-option: true
    });
  }

  // Pushpin
  var pushpin = document.querySelectorAll('.pushpin');
  for (var i = 0; i < pushpin.length; i++) {
    M.Pushpin.init(pushpin[i], {
      // example-option: true
    });
  }


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.pushpin');
    var instances = M.Pushpin.init(elems, options);
  });

  // Slides
  var slides = document.querySelectorAll('.slider');
  for (var i = 0; i < slides.length; i++) {
    M.Slider.init(slides[i], {
    });
  }

  // Fixed Action Button
  var action = document.querySelectorAll('.fixed-action-btn');
  for (var i = 0; i < action.length; i++) {
    M.FloatingActionButton.init(action[i], {
      hoverEnabled: false,
      // toolbarEnabled: true
    });
  }

  // Tabs
  var tabs = document.querySelectorAll('.tabs')
  for (var i = 0; i < tabs.length; i++){
    M.Tabs.init(tabs[i], {
    });
  }

  // Tooltips
  var tooltips = document.querySelectorAll('.tooltipped')
  for (var i = 0; i < tooltips.length; i++){
  	M.Tooltip.init(tooltips[i], {
    });
  }


});
