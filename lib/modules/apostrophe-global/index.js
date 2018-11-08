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
      type: 'string',
      textarea: true,
      help: 'Your legal and data protection here'
    },
    {
      name: 'legal',
      label: 'Legal Info',
      type: 'string',
      textarea: true,
      help: 'Your adress, phone and other info here'
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
    },
    // Sender ARN and mailto for Contact form
    {
      name: 'arn',
      label: 'Sender ARN',
      type: 'string',
      help: 'String for connecting AWS SES services'
    },
    {
      name: 'mailto',
      label: 'Sender Mail',
      type: 'string',
      help: 'AWS SES sender email'
    }
  ],
  // Fields Arrangement
    arrangeFields: [
    {
      name: 'about',
      label: 'About',
      fields: [ 'privacy', 'legal', 'creation_date', 'copyright',  ]
    },
    {
      name: 'email',
      label: 'Email Settings',
      fields: [ 'arn', 'mailto' ]
    }
  ]
};
