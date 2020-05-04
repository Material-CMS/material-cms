module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Image Widget',
  addFields: [
    {
      name: 'title',
      type: 'boolean',
      label: 'Show Image Titles'
    },
    {
      name: 'titleColor',
      type: 'color',
      label: 'Color Of Image Titles',
      help: 'Override image title Color'
    },
    {
      name: 'descriptionColor',
      type: 'color',
      label: 'Color Of Image Descriptions',
      help: 'Override image description color'
    },
    {
      name: 'shadowOn',
      type: 'boolean',
      label: 'Turn On Image Shadow'
    }
  ],
  arrangeFields: [
    { name: 'images', label: 'Images', fields: [ '_pieces' ] },
    { name: 'options', label: 'Options', fields: [ 'title', 'shadowOn', 'titleColor', 'descriptionColor' ] }
  ]
};
