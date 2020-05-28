module.exports = {
  extend: 'apostrophe-images-widgets',
  piecesModuleName: 'apostrophe-images',
  label: 'Slider Widget',
  beforeConstruct: function(self, options) {
    if (options.focalPoint === undefined) {
      options.focalPoint = true;
    }
  }
};
