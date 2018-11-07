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
      hover: false
    });
  }

  // Collapsibles
  var collapsibles = document.querySelectorAll('.collapsible');
  for (var i = 0; i < collapsibles.length; i++) {
    M.Collapsible.init(collapsibles[i], {
      // example-option: true
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
  var tabs = document.querySelectorAll('.tabs');
  for (var i = 0; i < tabs.length; i++) {
    M.Tabs.init(tabs[i], {
      // example-option: true
    });
  }

  // Material Box
  var materialboxes = document.querySelectorAll('.materialboxed');
  for (var i = 0; i < materialboxes.length; i++) {
    M.Materialbox.init(materialboxes[i], {
      // example-option: true
    });
  }

  // Slides
  var slides = document.querySelectorAll('.slider');
  for (var i = 0; i < slides.length; i++) {
    M.Slider.init(slides[i], {
      // example-option: true
    });
  }

});
