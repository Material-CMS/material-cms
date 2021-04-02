module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Link to Page',
  addFields: [
    {
      name: '_page',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      label: 'Page',
      help: 'Link a internal page.',
      required: true,
      idField: 'pageId',
      filters: {
        projection: {
          title: 1,
          _url: 1
        }
      }
    },
    {
      name: '_subpages',
      type: 'joinByArray',
      withType: 'apostrophe-page',
      label: 'Subpages',
      help: 'Choose subpages of linked page to display in an dropdown.',
      idsField: 'subpage',
      filters: {
        projection: {
          title: 1,
          _url: 1
        }
      }
    }
  ]
};
