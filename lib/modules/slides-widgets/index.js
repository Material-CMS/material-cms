module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'slides',
  label: 'Slides Widget',
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      slogan: 1,
      caption: 1,
      _image: 1
    }
  }
};
