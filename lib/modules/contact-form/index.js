var async = require('async');

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'contact-form',
  label: 'Message',
  alias: 'contactForm',
  addFields: [
    {
      name: 'name',
      type: 'string',
      label: 'Your Name',
      style: 'account_circle',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      label: 'Your Email',
      style: 'email',
      required: true
    },
    {
      name: 'title',
      type: 'string',
      label: 'Subject',
      style: 'chat_bubble',
      required: true
    },
    {
      name: 'body',
      type: 'string',
      label: 'Message',
      style: 'edit',
      textarea: true,
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: [ 'name', 'email', 'title', 'body' ] },
  ],
  permissionsFields: false,

  afterConstruct: function(self) {
    self.setSubmitSchema();
  },

  construct: function(self, options) {

    self.setSubmitSchema = function() {
      self.submitSchema = self.apos.schemas.subset(self.schema,
        [ 'name', 'email', 'title', 'body' ]
      );
    };

    self.submit = function(req, callback) {
      var piece = {};
      return async.series([
        convert,
        insert
      ], callback);
      function convert(callback) {
        return self.apos.schemas.convert(req, self.schema, 'form', req.body, piece, callback);
      }
      function insert(callback) {
        return self.insert(req, piece, { permissions: false }, callback);
      }
    };

  }
};
