module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Header',
  addFields: [
    {
      name: 'header',
      type: 'string',
      label: 'Header Text',
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
      label: 'Header Color',
      type: 'color',
      help: 'Choose a color to override accent color.'
    },
    {
      name: 'headerAdditionalFont',
      type: 'boolean',
      label: 'Header Additional Font',
      help: 'Use additional font for header. (Add one in global before)'
    }
  ]
};
