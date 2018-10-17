module.exports = {
  extend: 'apostrophe-pieces',
  name: 'text',
  label: 'Text',
  pluralLabel: 'Texts',
  contextualOnly: false,
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Remove Title if you want text widget without header'
    },
    {
      name: 'text',
      label: 'Text',
      type: 'string',
      help: 'Add Text',
      textarea: true
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'slug', 'text'] }
  ]
};
