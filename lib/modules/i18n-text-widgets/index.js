module.exports = {
  extend: 'apostrophe-widgets',
  label: 'I18n Text',
  addFields: [
    {
      name: 'text',
      type: 'multilingual-string',
      label: 'Text',
      required: false,
      textarea: true,
      rows: 8,
    },
    {
      name: 'align',
      type: 'select',
      label: 'Text Align',
      help: 'Choose text align. (left, center, right, justify)',
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
        },
        {
          label: 'Justify',
          value: 'justify'
        }
      ]
    },
    {
      name: 'color',
      label: 'Text Color',
      type: 'color',
      help: 'Choose a color to override accent color.'
    }
  ]
};
