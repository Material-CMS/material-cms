module.exports = {
  extend: 'apostrophe-pieces',
  name: 'table',
  label: 'Table',
  pluralLabel: 'Tables',
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Choose title for table content',
      required: true,
    },
    {
      name: 'tableBodys',
      type: 'array',
      label: 'Table Bodys',
      help: 'Choose table content',
      titleField: 'name',
      required: true,
      schema: [
        {
          name: 'name',
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
          name: 'image',
          type: 'area',
          label: 'Image',
          help: 'Add an image as table content',
          options: {
            limit: 1,
            widgets: {
              'card': {
                 aspectRatio: [ 2, 1 ],
                 limit: 1,
                 controls: {
                   cloneable: false,
                   removable: true,
                   position: 'top-right'
                 }
               }
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
      fields: ['title', 'tableBodys']
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ]
};
