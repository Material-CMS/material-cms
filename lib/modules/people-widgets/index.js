module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'people',
  label: 'People Widget',
  addFields: [
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Element Shadow',
      help: 'Choose if element has a shadow. (default: Yes)',
      def: true
    }
  ],
  // Fields Arrangement
  arrangeFields: [
    {
      name: 'people',
      label: 'People',
      fields: [
        'by',
        'limitByAll',
        '_pieces',
        'tags',
        'limitByTag'
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'shadow'
      ]
    }
  ],
  // Filter what is loaded from piece
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      firstName: 1,
      lastName: 1,
      body: 1,
      email: 1,
      phone: 1,
      _thumbnail: 1
    }
  }
};
