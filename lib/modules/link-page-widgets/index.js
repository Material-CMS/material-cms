module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link to a Page',
  addFields: [
    {
      name: '_page',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      label: 'Page',
      required: true,
      idField: 'pageId',
      filters: {
        projection: {
          title: 1,
          _url: 1
        }
      }
    },
    {
      name: 'headerAlign',
      type: 'select',
      label: 'Header Text Align',
      help: 'Choose header text align. (left, center, right)',
      choices: [
        {
          label: 'Left',
          value: 'left',
          def: true
        },
        {
          label: 'Center',
          value: 'center'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ]
    },
    {
      name: 'label',
      type: 'string',
      label: 'Label',
      required: true
    },
    {
      name: 'color',
      label: 'Link Color',
      type: 'color',
      help: 'Choose a color to override accent color.'
    }
  ]
};
