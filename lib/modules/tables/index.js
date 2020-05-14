module.exports = {
  extend: 'apostrophe-pieces',
  name: 'table',
  label: 'Table Row',
  pluralLabel: 'Table Rows',
  seo: false,
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Choose title for table content',
      required: true,
    },
    {
      name: 'tableObjects',
      type: 'array',
      label: 'Table Row Objects',
      help: 'Add as infinite ojects to tabel row',
      titleField: 'text',
      required: true,
      schema: [
        {
          name: 'tableObjectChoice',
          type: 'select',
          label: 'Choose Table Object',
          help: 'Set height for carousel',
          choices: [
            {
              label: 'Text',
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
          label: 'Text',
          help: 'Add text or numbers as table content'
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          help: 'Add a date as table content',
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
      fields: ['title', 'tableObjects']
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ]
};
