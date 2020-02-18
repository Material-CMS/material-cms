var BigPicture = require('bigpicture')

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'gallery',
  label: 'Gallery',
  pluralLabel: 'Galleries',
  addFields: [
    {
      name: 'title',
      label: 'Carousel Title',
      type: 'string',
      help: 'This title is the first Cloumn of the gallery',
    },
    {
      name: 'headerColor',
      type: 'color',
      label: 'Title Color',
      help: 'Remove to set gallery header to accent color'
    },
    {
      name: 'headerCenter',
      type: 'boolean',
      label: 'Title Center',
      help: 'Choose to center title'
    },
    {
      name: '_images',
      type: 'joinByArray',
      withType: 'apostrophe-image',
      label: 'Images',
      help: 'Choose images for gallery',
      required: true,
      limit: 24,
      noHeight: true,
      filters: {
        projection: {
          attachment: true,
          description: true,
          title: true
        }
      }
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', '_images'] },
    { name: 'colors', label: 'Colors', fields: [ 'headerColor', 'headerCenter' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] }
  ],
  construct: function(self, options) {
    // Override output function to pass some vars to the widget.html template
    self.output = function(widget, options) {
      // opens gallery w/ all three images
      BigPicture({
      	el: e.target,
      	gallery: '.images',
      })
    };
  }
};
