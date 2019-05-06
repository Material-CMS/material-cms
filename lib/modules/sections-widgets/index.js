module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'sections',
  label: 'Sections Widget',
  addFields: [
    {
      name: 'i18nNav',
      label: 'Navigation language switch',
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'settings', label: 'Settings', fields: [ 'i18nNav' ] },
  ],
  filters: {
    projection: {
      slug: 1,
      title: 1,
      type: 1,
      tags: 1,
      color: 1,
      headerColor: 1,
      header: 1,
      preferences: 1,
      default: 1,
      slideOn: 1,
      footerOn: 1,
      _image: 1,
      thankYouMessage: 1,
      content: 1 // Data for Container Widgets see widget.html
    }
  }
};
