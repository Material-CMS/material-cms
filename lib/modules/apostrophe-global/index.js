// in the lib/module/apostrophe-global/index.js file
// of your own project. Never edit the Apostrophe
// npm module itself

module.exports = {
  addFields: [
    // About Fields
    {
      name: 'privacy',
      label: 'Privacy Statement',
      type: 'string',
      textarea: true,
      help: 'Put your legal and data protection here'
    },
    {
      name: 'legal',
      label: 'Legal Info',
      type: 'string',
      textarea: true,
      help: 'Put adress, phone and other info here'
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
  // Arrange Fields
    arrangeFields: [
    {
      name: 'about',
      label: 'About',
      fields: [ 'privacy', 'legal' ]
    },
    {
      name: 'email',
      label: 'Email Settings',
      fields: [ 'arn', 'mailto' ]
    }
  ]
};
