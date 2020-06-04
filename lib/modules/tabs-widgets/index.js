module.exports = {
  extend: 'apostrophe-widgets',
  name: 'tabs',
  label: 'tabs Widget',
  addFields: [
    {
      name: 'tabs',
      label: 'Tabs',
      type: 'array',
      help: 'Add Tab Container',
      titleField: 'title',
      schema: [
        {
          name: 'title',
          type: 'string',
          labe: 'Tab Title',
          help: 'Set title for Tab'
        },
        {
          name: 'tab',
          type: 'area',
          label: 'Tab',
          help: 'Choose Tab Widget',
          options: {
            limit: 1,
            widgets: {
              'card': {
                size: 'one-half',
                aspectRatio: [ 2, 1 ],
                sizesAttr: '(max-width:600px) 50vw, 40vw',
                limit: 1,
                controls: {
                  cloneable: false,
                  removable: true,
                  position: 'top-right'
                }
              },
               'events': {
                 controls: {
                   cloneable: false,
                   removable: true,
                   position: 'top-right'
                 }
               },
               'texts': {
                 controls: {
                   cloneable: false,
                   removable: true,
                   position: 'top-right'
                 }
               },
               'video': {
                 controls: {
                   cloneable: false,
                   removable: true,
                   position: 'top-right'
                 }
               },
               'people': {
                 controls: {
                   cloneable: false,
                   removable: true,
                   position: 'top-right'
                 }
               },
               'tables': {
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
  ]
};
