module.exports = {
  extend: 'apostrophe-pieces',
  name: 'person',
  label: 'Person',
  pluralLabel: 'People',
  addFields: [
    {
      name: 'title',
      label: 'Full Name',
      type: 'string',
      required: true,
      contextual: true
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'string',
      help: 'Choose First Name(s)',
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'string',
      help: 'Choose Last Name(s)',
      required: true
    },
    {
      name: 'body',
      label: 'Biography',
      type: 'area',
      help: 'Choose Biography',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: [ 'Bold', 'Italic', 'Link', 'Unlink' ]
          }
        }
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      help: 'Choose Email Address'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'string',
      help: 'Choose Phone Number'
    },
    {
      name: '_thumbnail',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Profile Picture',
      help: 'Choose Profile Picture',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: [ 'firstName', 'lastName', '_thumbnail' ] },
    { name: 'more', label: 'More', fields: [ 'body', 'email', 'phone' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] }
  ],

  construct: function(self, options) {
    self.beforeSave = function(req, piece, options, callback) {
      piece.title = piece.firstName + ' ' + piece.lastName;

      return callback();
    };
  }
};
