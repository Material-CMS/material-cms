var async = require('async');

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'contact-form',
  label: 'Message',
  alias: 'contactForm',
  seo: false,
  openGraph: false,
  permissionsFields: false,
  email: {
    from: process.env.EMAIL
  },
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Your Name',
      input: 'text',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      label: 'Your Email',
      input: 'email',
      required: true
    },
    {
      name: 'body',
      type: 'string',
      label: 'Message',
      input: 'textarea',
    }
  ],
  arrangeFields: [
  	{
  		name: 'message',
  		label: 'Message',
  		fields: [ 'title', 'email', 'body' ]
  	},
  	{
  		name: 'info',
  		label: 'Info',
  		fields: [ 'slug', 'tags', 'published' ]
  	},
  ],

  afterConstruct: function(self) {
    self.setSubmitSchema();
  },

  construct: function(self, options) {

    // build submit shema
    self.setSubmitSchema = function() {
      self.submitSchema = self.apos.schemas.subset(self.schema,
        [ 'title', 'email', 'body' ]
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
