module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'texts',
  label: 'Texts Widget',
  arrangeFields: [
    {
      name: 'texts',
      label: 'Texts',
      fields: ['by', 'limitByAll', '_pieces', 'tags', 'limitByTag']
    }
  ],
  filters: {
    projection: {
      slug: 1,
      type: 1,
      tags: 1,
      title: 1,
      titleColor: 1,
      titleShow: 1,
      titleCenter: 1,
      backColor: 1,
      extraLink: 1,
      blogOn: 1,
      description: 1,
      text: true,
      buttonText: 1,
      linkText: 1,
      sideImage: 1,
      topImage: 1,
      sideImageLeft: 1,
      _url: 1
    }
  }
};
