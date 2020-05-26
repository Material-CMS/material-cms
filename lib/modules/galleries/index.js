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
      name: 'imagesTitleShow',
      type: 'select',
      label: 'Show Titles of Images',
      help: 'Show title inside image',
      choices: [
        {
          label: 'No',
          value: false,
          def: true
        },
        {
          label: 'Yes',
          value: true,
          showFields: [ 'imagesTitleCenter', 'imagesTitleColor' ]
        }
      ]
    },
    {
      name: 'imagesTitleCenter',
      type: 'boolean',
      label: 'Center Titles of Images',
      help: 'Choose to center titles of images'
    },
    {
      name: 'imagesTitleColor',
      type: 'color',
      label: 'Images Title Color',
      help: 'Remove to set titles of images to accent color'
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
      label: 'Gallery Container',
      help: 'Put gallery in container deactivate this for full width widgets',
      choices: [
        {
          label: 'Yes',
          value: true,
          def: true,
          showFields: [ 'card' ]
        },
        {
          label: 'No',
          value: false
        }
      ]
    },
    {
      name: 'card',
      type: 'boolean',
      label: 'Material Card Container',
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
        },
        {
          label: 'Four',
          value: '4'
        },
        {
          label: 'Three',
          value: '3',
          def: true
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
  	{
  		name: 'basics',
  		label: 'Basics',
  		fields: [ 'title', '_images' ]
  	},
  	{
  		name: 'colors',
  		label: 'Colors',
  		fields: [ 'titleColor', 'backColor', 'imagesTitleColor',]
  	},
  	{
  		name: 'options',
  		label: 'Options',
  		fields: [ 'columnCount', 'titleShow', 'titleCenter', 'imagesTitleShow', 'imagesTitleCenter', 'container', 'card' ]
  	},
  	{
  		name: 'info',
  		label: 'Info',
  		fields: [ 'slug', 'tags', 'published' ]
  	}
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
