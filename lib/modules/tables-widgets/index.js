module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'tables',
  label: 'Table Widget',
  addFields: [
    {
      name: 'title',
      type: 'string',
      labe: 'Widget Title',
      help: 'Set title for widget.'
    },
    {
      name: 'titleColor',
      type: 'color',
      labe: 'Widget Title Color',
      help: 'Set color for widget title.'
    },
    {
      name: 'tableHeaders',
      type: 'array',
      label: 'Table Headers',
      help: 'Choose table headers.',
      titleField: 'text',
      schema: [
        {
          name: 'text',
          type: 'string',
          label: 'Header text'
        },
      ]
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: ['tableHeaders', 'by', 'limitByAll', '_pieces', 'tags', 'limitByTag']
    },
    {
      name: 'options',
      label: 'Options',
      fields: ['title', 'titleColor']
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      titleAsObject: 1,
      tableRowObjects: 1,
      name: 1,
      date: 1,
      image: 1,
      _url: 1
    }
  }

};
