module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'texts',
  label: 'Texts Widget',
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      color: 1,
      text: 1,
      _image: 1
    }
  }
};
