//Materialize Components Jquery initializations
$(function(){
  // Collasible init and Options
  var elem = document.querySelector('.collapsible');
  var instance = new M.Collapsible(elem, {
    // accordion:	true
  });
  // Sidenav init and Options
  var elem = document.querySelector('.sidenav');
  var instance = new M.Sidenav(elem, {
   draggable: true,
   preventScrolling: true
  });
  // Modal init and Options
  var elem = document.querySelector('.modal');
  var instance = new M.Modal(elem, {
   preventScrolling: true
  });
  // Tabs
  $('.tabs').tabs();
});
