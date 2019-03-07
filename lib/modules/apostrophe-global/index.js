// in the lib/module/apostrophe-global/index.js file
// of your own project. Never edit the Apostrophe
// npm module itself

module.exports = {
  addFields: [
    // About Fields
    {
      name: 'title',
      label: 'Page Title',
      type: 'string',
      help: 'Title of your Webapp'
    },
    {
      name: 'privacy',
      label: 'Privacy Statement',
      help: 'Your legal and data protection here',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: [
              'Styles',
              'Bold',
              'Italic',
              'Blockquote',
              'BulletedList',
              'Link'
            ],
            controls: {
              movable: false,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
           }
         }
       }
    },
    {
      name: 'legal',
      label: 'Legal Info',
      help: 'Your adress, phone and other info here',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: [
              'Styles',
              'Bold',
              'Italic',
              'Blockquote',
              'BulletedList',
              'Link'
            ],
            controls: {
              movable: false,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
           }
         }
       }
    },
    {
      name: 'creation_date',
      label: 'Creation Date',
      type: 'date',
      pikadayOptions: {
        format: 'YYYY'
      }
    },
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'string',
      help: 'Your Company'
    }
  ],
  // Fields Arrangement
    arrangeFields: [
    {
      name: 'about',
      label: 'About',
      fields: [ 'privacy', 'legal', 'creation_date', 'copyright',  ]
    }
  ]
};
