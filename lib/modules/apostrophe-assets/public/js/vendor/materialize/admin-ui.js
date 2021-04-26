// Materialize components for admin-ui get inititalized here
// all other materialize inititalizations are done widget specific
$(document).ready(function() {
  // Floating Action Button
  var btn = document.querySelector('.fixed-action-btn.btn-admin');
  M.FloatingActionButton.init(btn, {
    hoverEnabled: false
  });
  // Initialize Materialize Dropdown
  var dropdowns = document.querySelector('.dropdown-trigger.trigger-admin')
    M.Dropdown.init(dropdowns, {
      closeOnClick: false,
      coverTrigger: false,
      hover: false
    });
});
