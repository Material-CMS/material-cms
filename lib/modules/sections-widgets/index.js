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
      color: 1,
      titleColor: 1,
      preferences: 1,
      default: 1,
      slideOn: 1,
      footerOn: 1,
      _image: 1,
      content: 1 // Data for Container Widgets see widget.html
    }
  }
};
