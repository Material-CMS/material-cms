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
    },
    {
      name: 'body',
      type: 'string',
      label: 'Message',
      style: 'edit',
      textarea: true,
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: [ 'name', 'email', 'title', 'body' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] },
  ],
  permissionsFields: false,

  // Email default "from" address for this module
  email: { from: process.env.EMAIL},

  afterConstruct: function(self) {
    self.setSubmitSchema();
  },

  construct: function(self, options) {

    // build submit shema
    self.setSubmitSchema = function() {
      self.submitSchema = self.apos.schemas.subset(self.schema,
        [ 'name', 'email', 'title', 'body' ]
      );
    };

    // Submit request to piece
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

    // Submit request by email
    self.afterInsert = function(req, piece, options, callback) {
      return self.email(req, 'emailInserted', {
          piece: piece
        }, {
          // can also specify from and other
          // valid properties for nodemailer messages here
          to: process.env.EMAIL,
          subject: 'A new suggestion was received'
        },
        callback
      );
    };

  }
};
