module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-button',
  label: 'Material Button',
  contextualOnly: false,
  addFields: [
      {
        type: 'string',
        name: 'phone',
        label: 'Phone'
      },
      {
        type: 'string',
        name: 'email',
        label: 'Email'
      }
    ]
};
console.log('Materialize button loaded')
