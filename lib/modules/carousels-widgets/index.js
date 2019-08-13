module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'carousels',
  label: 'Carousel Widget',
  addFields: [
    {
      name: 'title',
      label: 'Carousel Widget Title',
      type: 'string',
      help: 'This is the title for the carousel widget',
    },
    {
      name: 'titleColor',
      label: 'Title Color',
      type: 'color',
      help: 'Remove to set title to Accent Color'
    },
    {
      name: 'backColor',
      label: 'Background Color',
      type: 'color',
      help: 'Remove to set Background to Main Color'
    },
    {
      name: 'shadowOn',
      label: 'Turn On Text Card Shadow',
      type: 'boolean'
    },
    {
      name: 'carouselSlideOn',
      label: 'Turn On Slide Carousel',
      type: 'boolean'
    },
    {
      name: 'carouselSlideSmaller',
      label: 'Smaller Slide Carousel',
      type: 'boolean',
      help: 'This is useful for text sliders'
    }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'description', 'text', '_image', 'extraLink'] },
    { name: 'options', label: 'Options', fields: ['shadowOn', 'carouselSlideOn', 'carouselSlideSmaller'] },
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleOn: 1,
      carousel: 1,
    }
  }
};
