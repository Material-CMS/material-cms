apos.define('apostrophe-forms-select-field-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      // Initialize Materialize Collapsible
      var formSelect = M.FormSelect.init(el.querySelector('select'), {
        // example-option: true
      });
    };
  }
});
