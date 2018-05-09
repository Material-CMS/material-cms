module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-collapsible',
  label: 'Material Collapsible',
  contextualOnly: false,
    addFields: [
      // Field 1
      {
        name: 'header1',
        label: 'Header one',
        type: 'string'
      },
      {
        name: 'text1',
        label: 'Description one',
        type: 'string'
      },
      {
        name: 'date1',
        label: 'Date one',
        type: 'date',
        def: null
      },
      // Field 2
      {
        name: 'header2',
        label: 'Header two',
        type: 'string'
      },
      {
        name: 'text2',
        label: 'Description two',
        type: 'string'
      },
      {
        name: 'date2',
        label: 'Date two',
        type: 'date',
        def: null
      },
      // Field 3
      {
        name: 'header3',
        label: 'Header three',
        type: 'string'
      },
      {
        name: 'text3',
        label: 'Description three',
        type: 'string'
      },
      {
        name: 'date3',
        label: 'Date three',
        type: 'date',
        def: null
      }
    ]
  };
