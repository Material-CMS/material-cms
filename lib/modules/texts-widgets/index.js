module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'texts',
  label: 'Texts Widget',
  addFields: [
    {
      name: 'shadowOn',
      label: 'Turn On Text Card Shadow',
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'options', label: 'Options', fields: ['shadowOn'] }
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
      description: 1,
      text: 5,
      buttonText: 1,
      linkText: 1,
      _image: 1
    }
  }
};
