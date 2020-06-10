module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  addFields: [
    {
      name: 'title',
      type: 'boolean',
      label: 'Show Image Titles',
      help: 'Choose to show the titles of image or multiple images in slideshow',
      def: true
    }
  ],
  arrangeFields: [
    {
      name: 'images',
      label: 'Images',
      fields: [ '_pieces' ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [ 'title', ]
    }
  ]
};
