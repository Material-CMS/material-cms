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
    { name: 'images', label: 'Images', fields: [ '_pieces' ] },
    { name: 'options', label: 'Options', fields: [ 'title', 'color', 'shadowOn' ] }
  ]
};
