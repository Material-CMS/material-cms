module.exports = {
  name: 'texts',
  label: 'Texts Widget',
  extend: 'apostrophe-pieces-widgets',
  filters: {
    projection: {
      slug: 1,
      title: 1,
      type: 1,
      tags: 1,
      text: 1
    }
  }
};
