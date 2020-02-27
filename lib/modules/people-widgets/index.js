module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'people',
  label: 'People Widget',
  addFields: [
    {
      name: 'shadowOn',
      label: 'People Widget Shadow On',
      help: 'Gives the people widget a shadow',
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'texts', label: 'Texts', fields: [ 'by', 'limitByAll', '_pieces', 'tags', 'limitByTag' ] },
    { name: 'options', label: 'Options', fields: ['shadowOn'] }
  ],
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
