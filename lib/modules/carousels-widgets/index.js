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
      type: 'boolean',
      help: 'Give whole card a shadow effect'
    },
    {
      name: 'preferences',
      type: 'select',
      label: 'Select Slider Style',
      help: 'Choose section style',
      choices: [
        {
          label: 'Default',
          value: 'default'
        },
        {
          label: 'Slide Carousel',
          value: 'carouselSlideOn',
          showFields: [ 'carouselSlideSmaller' ]
        }
      ]
    },
    {
      name: 'carouselSlideSmaller',
      label: 'Text Slide Carousel',
      type: 'boolean',
      help: 'This is useful for text sliders'
    }
  ],
  arrangeFields: [
    { name: 'carousels', label: 'Carousels', fields: [ 'by', 'limitByAll', '_pieces', 'tags', 'limitByTag' ] },
    { name: 'options', label: 'Options', fields: ['title', 'titleColor', 'shadowOn', 'preferences', 'carouselSlideSmaller', 'backColor' ] },
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
