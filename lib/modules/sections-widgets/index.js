module.exports = {
  extend: 'apostrophe-pieces-widgets',
  name: 'sections',
  label: 'Sections Widget',
  addFields: [
    {
      name: 'i18nNav',
      type: 'boolean',
      label: 'Navigation Language Switch',
      help: 'Use different subpages for simple multilanguage page. This makes menu smaller for better language selection'
    },
    {
      name: 'buttonOn',
      type: 'boolean',
      label: 'Contact Info Button On',
      help: 'Thurn On button on the lower right corner with your display your contact Info',
      def: false
    },
  ],
  arrangeFields: [
    { name: 'select', label: 'Select', fields: [ 'by', 'limitByAll', '_pieces', 'tags', 'limitByTag' ] },
    { name: 'settings', label: 'Settings', fields: [ 'i18nNav' , 'buttonOn'] }
  ],
  filters: {
    projection: {
      slug: 1,
      title: 1,
      type: 1,
      tags: 1,
      color: 1,
      headerColor: 1,
      headerOn: 1,
      containerOn: 1,
      cardOn: 1,
      preferences: 1,
      default: 1,
      slideOn: 1,
      footerOn: 1,
      _image: 1,
      _sideImage: 1,
      sideImageRight: 1,
      thankYouMessage: 1,
      content: 1 // Data for Container Widgets see widget.html
    }
  }
};
