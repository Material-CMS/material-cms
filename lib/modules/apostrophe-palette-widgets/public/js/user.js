apos.define('apostrophe-palette-widgets', {
  construct: function (self, options) {

    // runs before the new palette values are sent to the server but does not block it
    self.beforeSubmit = function ($field, fieldValue, fieldSchema) {
      console.log($field); // the jQuery object for the schema field
      console.log(fieldValue); // the new value being sent to the server
      console.log(fieldSchema); // the changed field's schema
    };

    // runs after the front-end has recieved word that submission process has completed
    self.afterSubmit = function ($field, fieldValue, fieldSchema) {
      console.log($field); // the jQuery object for the schema field
      console.log(fieldValue); // the new value being sent to the server
      console.log(fieldSchema); // the changed field's schema
    };

  }
});
