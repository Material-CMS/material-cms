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
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'string',
      required: true
    },
    {
      name: 'body',
      label: 'Biography',
      type: 'area',
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
      type: 'email'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'string'
    },
    {
      name: '_thumbnail',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Section Image',
      help: 'Choose background for section',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    }
  ],
  construct: function(self, options) {
    self.beforeSave = function(req, piece, options, callback) {
      piece.title = piece.firstName + ' ' + piece.lastName;
      return callback();
    };
  }
};
