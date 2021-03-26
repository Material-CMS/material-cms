module.exports = {
  extend: 'apostrophe-pieces',
  name: 'table',
  label: 'Table Row',
  pluralLabel: 'Table Rows',
  slugPrefix: 'table-',
  seo: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Title',
      help: 'Choose title for table content.',
      required: true,
    },
    {
      name: 'titleColor',
      type: 'color',
      labe: 'Table Row Title Color',
      help: 'Set color for table row title.'
    },
    {
      name: 'titleAsObject',
      type: 'boolean',
      label: 'Title As Object',
      help: 'Set title as first object for table row.',
    },
    {
      name: 'tableRowObjects',
      type: 'array',
      label: 'Table Row Objects',
      help: 'Add as infinite ojects to tabel row.',
      titleField: 'text',
      required: true,
      schema: [
        {
          name: 'tableRowObjectChoice',
          type: 'select',
          label: 'Choose Table Row Object',
          htmlHelp: 'Add text, mumbers, dates or images as table row objects.' + '<br />' +
          '(should equal the number of table headers in your widget or page settings)',
          choices: [
            {
              label: 'Text Or Number',
              value: 'textObject',
              showFields: [ 'text' ],
              def: true
            },
            {
              label: 'Date',
              value: 'dateObject',
              showFields: [ 'date' ]
            },
            {
              label: 'Image',
              value: 'imageObject',
              showFields: [ '_image' ]
            }
          ]
        },
        {
          name: 'text',
          type: 'string',
          label: 'Text Or Number',
          help: 'Add text or numbers as table row object.'
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          help: 'Add a date as table row object.',
          pikadayOptions: {
            format: 'DD/MM/YYYY',
            firstDay: 1
          }
        },
        {
          name: '_image',
          type: 'joinByOne',
          withType: 'apostrophe-image',
          label: 'Image',
          help: 'Add an image as table row object.',
          limit: 1,
          controls: {
            moveable: false,
            cloneable: false,
            removable: true,
            position: 'top-right'
          },
          filters: {
            projection: {
              attachment: true,
              description: true,
              title: true
            }
          }
        }
      ]
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: ['title', 'titleAsObject', 'tableRowObjects']
    },
    {
      name: 'options',
      label: 'Options',
      fields: ['titleColor']
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ]
};
