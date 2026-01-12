module.exports = {
  extend: 'apostrophe-widgets',
  label: 'I18n Text',
  addFields: [
    {
      name: 'text',
      type: 'multilingual-string',
      label: 'Header Text',
      required: false,
      textarea: true
    }
  ]
};
