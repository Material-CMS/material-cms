module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  addFields: [
    {
      name: 'titleColor',
      label: 'Title Color',
      type: 'color',
      help: 'Remove to set title to Accent Color'
    }
  ],
  arrangeFields: [
    { name: 'options', label: 'Options', fields: [ 'titleColor' ] },
  ]
};
