module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'texts-carousels',
  piecesModuleName: 'texts',
  label: 'Carousels Widget',
  addFields: [
    {
      name: 'title',
      type: 'string',
      labe: 'Widget Title',
      help: 'Set title for widget'
    },
    {
      name: 'titleColor',
      type: 'color',
      labe: 'Widget Title Color',
      help: 'Set color for widget title'
    },
    {
      name: 'carouselHeight',
      type: 'select',
      label: 'Carousel Height',
      help: 'Set height for carousel',
      choices: [
        {
          label: 'Small',
          value: 'small'
        },
        {
          label: 'Medium',
          value: 'medium',
          def: true
        },
        {
          label: 'Big',
          value: 'big'
        },
      ]
    }
  ],
  arrangeFields: [
    {
      name: 'texts',
      label: 'Texts',
      fields: ['by', 'limitByAll', '_pieces', 'tags', 'limitByTag']
    },
    {
      name: 'options',
      label: 'Options',
      fields: ['title', 'titleColor', 'carouselHeight']
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      backColor: 1,
      extraLink: 1,
      blogOn: 1,
      description: 1,
      text: 5,
      buttonText: 1,
      linkText: 1,
      sideImage: 1,
      _url: 1
    }
  }
};
