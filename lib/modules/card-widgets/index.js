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
    },
    {
      name: 'shadowOn',
      label: 'Turn On Image Shadow',
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'color', 'shadowOn','_pieces'] },
    { name: 'images', label: 'Images', fields: [ '_pieces'] }
  ]
};
