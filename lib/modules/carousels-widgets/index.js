module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'carousels',
  label: 'Carousel Widget',
  addFields: [
    {
      name: 'carouselSlideOn',
      label: 'Turn On Slide Carousel',
      type: 'boolean'
    }
  ],
  arrangeFields: [
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      carousel: 1,
    }
  }
};
