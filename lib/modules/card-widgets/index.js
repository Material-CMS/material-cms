module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Image Widget',
  addFields: [
    {
      name: 'title',
      label: 'Show Image Titles',
      type: 'boolean'
    },
    {
      name: 'color',
      label: 'Color Of Image Titles',
      type: 'color'
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'color', '_pieces'] }
  ]
};
