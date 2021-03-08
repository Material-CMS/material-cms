// in the lib/module/apostrophe-global/index.js file
// of your own project. Never edit the Apostrophe
// npm module itself

module.exports = {
  addFields: [
    // About Fields
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Add a title of your website (override by page specific title)'
    },
    {
      name: '_logo',
      type: 'joinByOne',
      withType: 'apostrophe-image',
      label: 'Logo',
      help: 'Choose a logo for your website (override by page specific logo)',
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
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
      help: 'Add your data privacy and protection disclamer here',
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
      name: 'footerPrivacy',
      label: 'Footer Privacy Button',
      type: 'string',
      help: 'Rename footer privacy button to something other than "Privacy"'
    },
    {
      name: 'legal',
      label: 'Legal Info',
      help: 'Add imprint or legal disclamer here',
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
      name: 'footerLegal',
      label: 'Footer Legal Button',
      type: 'string',
      help: 'Rename footer legal button to something other than "Legal"'
    },
    {
      name: 'creation_date',
      label: 'Creation Date',
      type: 'date',
      help: 'Add the creation date of your webapp',
      pikadayOptions: {
        format: 'YYYY'
      }
    },
    {
      name: 'copyright',
      label: 'Copyright Info',
      type: 'string',
      help: 'Add your company name'
    },
    {
      name: 'contactFormName',
      label: 'Name Field',
      type: 'string',
      help: 'Rename name field to something other than "Name"'
    },
    {
      name: 'contactFormEmail',
      label: 'Email Field',
      type: 'string',
      help: 'Rename email field to something other than "Email"'
    },
    {
      name: 'contactFormBody',
      label: 'Message Field',
      type: 'string',
      help: 'Rename message field to something other than "Message"'
    },
    {
      name: 'contactFormSend',
      label: 'Send Button',
      type: 'string',
      help: 'Rename send button to something other than "Send"'
    },
    {
      name: 'contactFormDisagree',
      label: 'Disagree Button',
      type: 'string',
      help: 'Rename disagree button to something other than "Disagree"'
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
      name: 'navTextColor',
      label: 'Nav Text Color',
      type: 'color',
      help: 'Navigation uses accent color by default, override here'
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
      name: 'logo',
      label: 'Logo',
      fields: ['_logo']
    },
    {
      name: 'footer',
      label: 'Footer',
      fields: ['copyright', 'creation_date', 'footerLegal', 'footerPrivacy']
    },
    {
      name: 'disclaimers',
      label: 'Disclaimers',
      fields: ['privacy', 'legal']
    },
    {
      name: 'contact',
      label: 'Contact Form',
      fields: ['contactFormName', 'contactFormEmail', 'contactFormBody', 'contactFormSend', 'contactFormDisagree', 'thankYouMessage']
    },
    {
      name: 'styles',
      label: 'Styles',
      fields: ['navTextColor', 'additionalStyles']
    },
  ]
};
