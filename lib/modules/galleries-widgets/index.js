module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'galleries',
  label: 'Gallery Widget',
  addFields: [
    {
      name: 'shadow',
      type: 'boolean',
      label: 'Shadow for Galleries',
      help: 'Choose shadow for galleries ( default: true )',
      def: true
    }
  ],
  arrangeFields: [
    {
      name: 'galleries',
      label: 'Galleries',
      fields: ['by', 'limitByAll', '_pieces', 'tags', 'limitByTag']
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleShow: 1,
      titleCenter: 1,
      titleColor: 1,
      imagesTitleShow: 1,
      imagesTitleCenter: 1,
      imagesTitleColor: 1,
      imagesShadow: 1,
      imagesKlick: 1,
      backColor: 1,
      columnCount: 1,
      _url: 1,
      _images: true,
    }
  }
};
