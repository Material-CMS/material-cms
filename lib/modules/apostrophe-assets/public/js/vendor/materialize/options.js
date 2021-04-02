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

  // Tooltips
  var tooltips = document.querySelectorAll('.tooltipped')
  for (var i = 0; i < tooltips.length; i++){
  	M.Tooltip.init(tooltips[i], {
    });
  }

  // Initialize Materialize Dropdown
  var dropdowns = document.querySelectorAll('.dropdown-trigger')
  for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      closeOnClick: false,
      coverTrigger: false,
      hover: false
    });
  }

});
