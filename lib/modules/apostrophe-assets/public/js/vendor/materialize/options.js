// Materialize Components get initialized here javascript
// you cann insert component specific options here
// jquery init is also possible look further materialize documentation

$(document).ready(function() {

  // Floating Action Button
  var btn = document.querySelectorAll('.fixed-action-btn');
  for (var i = 0; i < btn.length; i++) {
    M.FloatingActionButton.init(btn[i], {
      // toolbarEnabled: true,
      hoverEnabled: false
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

  // Modals
  var modals = document.querySelectorAll('.modal');
  for (var i = 0; i < modals.length; i++) {
    M.Modal.init(modals[i], {
      // example-option: true
    });
  }

  // Tabs
  var tabs = document.querySelectorAll('.tabs')
  for (var i = 0; i < tabs.length; i++){
    M.Tabs.init(tabs[i], {
    });
  }

  // Navigation Parallax Background Image
  var navParallax = document.querySelectorAll('.nav .parallax');
  for (var i = 0; i < navParallax.length; i++) {
    M.Parallax.init(navParallax[i], {
      // example-option: true
    });
  }

  // Navigation Pushpin ( needed? seems to work only with Materialize pushpin init in scripts.js...)
  var pushpin = document.querySelectorAll('.pushpin');
  for (var i = 0; i < pushpin.length; i++) {
    M.Pushpin.init(pushpin[i], {
      // example-option: true
    });
  }

  // Navigation Sidenav
  var sidenav = document.querySelectorAll('.sidenav');
  for (var i = 0; i < sidenav.length; i++) {
    M.Sidenav.init(sidenav[i], {
      draggable: true,
      preventScrolling: true
    });
  }

  // Tooltips
  var tooltips = document.querySelectorAll('.tooltipped')
  for (var i = 0; i < tooltips.length; i++){
  	M.Tooltip.init(tooltips[i], {
    });
  }

});
