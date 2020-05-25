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
      name: 'titleCenter',
      type: 'boolean',
      label: 'Title Center',
      help: 'Choose to center title'
    },
    {
      name: 'titleColor',
      type: 'color',
      label: 'Title Color',
      help: 'Remove to set gallery header to accent color'
    },
    {
      name: 'backColor',
      label: 'Background Color',
      type: 'color',
      help: 'Remove to set Background to Main Color'
    },
    {
      name: 'container',
      type: 'select',
      label: 'Gallery Container On',
      help: 'Put gallery in container deactivate this for full width widgets',
      choices: [
        {
          label: 'Yes',
          value: 'on',
          def: true,
          showFields: [ 'cardOn' ]
        },
        {
          label: 'No',
          value: ''
        }
      ]
    },
    {
      name: 'cardOn',
      type: 'boolean',
      label: 'Material Card Container On',
      help: 'Make whole gallery container to material card',
      def: false
    },
    {
      name: 'columnCount',
      type: 'select',
      label: 'Column Count',
      help: 'Choose how many columns the gallery should have ( mobile layout is excluded! )',
      choices: [
        {
          label: 'Five',
          value: '5',
          def: true
        },
        {
          label: 'Four',
          value: '4'
        },
        {
          label: 'Three',
          value: '3'
        }
      ]
    },
    {
      name: '_images',
      type: 'joinByArray',
      withType: 'apostrophe-image',
      label: 'Images',
      help: 'Choose images for gallery',
      required: true,
      limit: 48,
      noHeight: true,
      filters: {
        projection: {
          attachment: 1,
          description: 1,
          title: 1,
          credit: 1,
          creditUrl: 1
        }
      }
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', '_images'] },
    { name: 'colors', label: 'Colors', fields: ['titleColor', 'backColor'] },
    { name: 'options', label: 'Options', fields: [ 'columnCount', 'titleCenter', 'container', 'cardOn' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] }
  ],
  construct: (self, options) => {
    self.addUrls = (req, pieces, callback) => {
      for (const piece of pieces) {
        piece._url = 'https://external-site.com/products/${piece}.slug';
      }
      return callback(null);
    };
  }
};
