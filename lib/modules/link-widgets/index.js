module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link to Anywhere',
  addFields: [
    {
      name: 'url',
      type: 'url',
      label: 'URL',
      required: true
    },
    {
      name: 'label',
      type: 'string',
      label: 'Label',
      required: true
    },
    {
      name: 'headerAlign',
      type: 'select',
      label: 'Header Text Align',
      help: 'Choose header text align. (left, center, right)',
      choices: [
        {
          label: 'Left',
          value: 'left-align',
          def: true
        },
        {
          label: 'Center',
          value: 'center-align'
        },
        {
          label: 'Right',
          value: 'right-align'
        }
      ]
    },
    {
      name: 'color',
      label: 'Link Color',
      type: 'color',
      help: 'Choose a color to override accent color.'
    }
  ]
};
