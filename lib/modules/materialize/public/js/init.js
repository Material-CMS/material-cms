//Materialize Components javascript initialization
$( document ).ready(function(){
  // Sidenav
  var sidenavs = document.querySelectorAll('.sidenav')
  for (var i = 0; i < sidenavs.length; i++){
  	M.Sidenav.init(sidenavs[i], {
      draggable: true,
      preventScrolling: true
    });
  }
  // Collapsibles
  var collapsibles = document.querySelectorAll('.collapsible')
  for (var i = 0; i < collapsibles.length; i++){
    M.Collapsible.init(collapsibles[i], {
      // draggable: true,
    });
  }
  // Modals
  var modals = document.querySelectorAll('.modal')
  for (var i = 0; i < modals.length; i++){
  	M.Modal.init(modals[i]);
  }
  // Tabs
  var tabs = document.querySelectorAll('.tabs')
  for (var i = 0; i < tabs.length; i++){
  	M.Tabs.init(tabs[i]);
  }
});
