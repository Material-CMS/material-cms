module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'sections',
  label: 'Sections Widget',
  filters: {
    projection: {
      slug: 1,
      title: 1,
      type: 1,
      tags: 1,
      title: 1,
      color: 1,
      titleColor: 1,
      _image: 1,
      a: 1 // Container for Section Widgets see widget.html
    }
  }
};
