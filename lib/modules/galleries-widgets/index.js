module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'galleries',
  label: 'Gallery Widget',
  addFields: [
    {
      name: 'shadowOn',
      label: 'Turn On Text Card Shadow',
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'texts', label: 'Texts', fields: [ 'by', 'limitByAll', '_pieces', 'tags', 'limitByTag' ] },
    { name: 'options', label: 'Options', fields: ['shadowOn'] }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleCenter: 1,
      titleColor: 1,
      backColor: 1,
      cardOn: 1,
      columnCount: 1,
      _url: 1,
      _images: true,
    }
  }
};
