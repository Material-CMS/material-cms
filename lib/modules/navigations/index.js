module.exports = {
  extend: 'apostrophe-pieces',
  name: 'navigation',
  label: 'Navigation',
  pluralLabel: 'Navigations',
  slugPrefix: 'nav-',
  seo: false,
  openGraph: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      label: 'Nav Title',
      help: 'Choose title for navigation.',
      required: true
    },
    {
      name: 'linkArea',
      label: 'Link',
      type: 'area',
      help: 'Coose "Link to Anywhere" for external pages or "Link to a Page" to link subpages dynamicly.',
      options: {
        widgets: {
          'link': {
            controls: {
              cloneable: false
            }
          },
          'link-subpages': {
            controls: {
              cloneable: false
            }
          }
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'linkArea' ]
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ],
  // Hide navigation peace in admin
  construct: function(self, options) {
    if (self.name === 'navigation') {
      self.addToAdminBar = Function.prototype;
    }
  }

};
