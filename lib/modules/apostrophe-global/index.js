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
      help: 'Add a title of your webapp'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'string',
      help: 'Add your contact number'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'string',
      help: 'Add your contact email'
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'url',
      help: 'Add your Facebook account'
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'url',
      help: 'Add your Instagram account'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'url',
      help: 'Add your LinkedIn account'
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'url',
      help: 'Add your Twitter account'
    },
    {
      name: 'privacy',
      label: 'Privacy Statement',
      help: 'Add your legal and data protection here',
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
      help: 'Add your adress, phone and other info here',
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
      help: 'Add the creation date of your webapp ',
      pikadayOptions: {
        format: 'YYYY'
      }
    },
    {
      name: 'copyright',
      label: 'Copyright Info',
      type: 'string',
      help: 'Add your company name '
    },
    {
      name: 'thankYouMessage',
      label: 'Thank You Message',
      help: 'Is shown wen user submits contact form',
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
            styles: [
              { name: 'Meta', element: 'h5', attributes: { class: 'accent-color' } },
              { name: 'Flow Text', element: 'p', attributes: { class: 'flow-text' } },
              { name: 'Flow Text Centered', element: 'p', attributes: { class: 'flow-text' }, styles: { 'text-align': 'center'} },
              { name: 'Centered', element: 'p', styles: { 'text-align': 'center'} }
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
      name: 'additionalStyles',
      label: 'Additional Styles',
      type: 'string',
      help: 'Add additional css styles to your site ( MAY BREAK DESIGN SO TAKE CARE! )',
      textarea: true
    }
  ],
  // Fields Arrangement
  arrangeFields:[
    {
      name: 'about',
      label: 'About',
      fields: ['phone', 'email', 'facebook', 'instagram', 'linkedin', 'twitter']
    },
    {
      name: 'legal',
      label: 'Legal Info',
      fields: ['copyright', 'creation_date', 'privacy', 'legal', 'creation_date']
    },
    {
      name: 'tym',
      label: 'Thank You Message',
      fields: ['thankYouMessage']
    },
    {
      name: 'styles',
      label: 'Additional Styles',
      fields: ['additionalStyles']
    },
  ]
};
