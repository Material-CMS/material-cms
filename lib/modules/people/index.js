module.exports = {
  extend: 'apostrophe-pieces',
  name: 'person',
  label: 'Person',
  pluralLabel: 'People',
  slugPrefix: 'person-',
  seo: false,
  openGraph: false,
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
        name: 'slug',
        label: 'Slug',
        type: 'string',
        required: true,
        contextual: true
    },
    {
      name: '_thumbnail',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Profile Picture',
      help: 'Choose profile picture',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    },
    {
      name: 'body',
      label: 'Biography',
      type: 'area',
      help: 'Choose Biography',
      options: {
        limit: 1,
        widgets: {
          'apostrophe-rich-text': {
						toolbar: [
              'Styles',
              'Bold',
              'Italic',
              'Blockquote',
              'BulletedList',
              'Link',
              'Unlink',
              'Table'
            ],
						styles: [
							{
								name: 'Centered',
								element: 'p',
								styles: {
									'text-align': 'center'
								}
							},
              {
                name: 'Justified',
                element: 'p',
                styles: {
                  'text-align': 'justify'
                }
              },
							{
								name: 'H4',
								element: 'h4',
								attributes: {
									class: 'accent-color'
								}
							},
							{
								name: 'H4 Centered',
								element: 'h4',
								attributes: {
									class: 'accent-color'
								},
								styles: {
									'text-align': 'center'
								}
							}
            ],
						controls: {
							movable: false,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
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
      name: 'topImage',
      label: 'Top Image',
      type: 'area',
      options: {
        limit: 1,
        widgets: {
          'card': {
            aspectRatio: [ 3, 1 ],
            focalPoint: true,
            noHeight: true,
            limit: 1,
            controls: {
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
          }
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'firstName', 'lastName', '_thumbnail' ]
    },
    {
      name: 'about',
      label: 'About',
      fields: [ 'body', 'email', 'phone', 'topImage' ]
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ],
  construct: function(self, options) {
    self.beforeSave = function(req, piece, options, callback) {
      piece.title = piece.firstName + ' ' + piece.lastName;
      // Must add slug as contextual field otherwise not working!
      return callback();
    };
  }
};
