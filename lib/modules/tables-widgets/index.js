module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'tables',
  label: 'Table Widget',
  addFields: [
    {
      name: 'title',
      type: 'string',
      labe: 'Widget Title',
      help: 'Set title for widget'
    },
    {
      name: 'titleColor',
      type: 'color',
      labe: 'Widget Title Color',
      help: 'Set color for widget title'
    },
    {
      name: 'tableHeaders',
      type: 'array',
      label: 'Table Headers',
      help: 'Choose headers for table',
      titleField: 'name',
      schema: [
        {
          name: 'name',
          type: 'string',
          label: 'Header Name'
        },
      ]
    }
  ],
  arrangeFields: [
    {
      name: 'texts',
      label: 'Texts',
      fields: ['tableHeaders', 'by', 'limitByAll', '_pieces', 'tags', 'limitByTag']
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      tableBodys: 1,
      name: 1,
      date: 1,
      image: 1
    }
  }

};
