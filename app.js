var path = require('path');

var apos = require('apostrophe')({
  shortName: 'fullpage-cms',
  baseUrl: 'http://localhost:3000',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.

  modules: {
    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    //Style modules
    'fullpage': {},
    'apostrophe-video-widgets': {},
    'color-picker': {},
    'background-widgets': {},
    'materialize': {},
    'materialize-video-widgets': {},
    'materialize-card-widgets': {},
    'materialize-cards-widgets': {},
    'materialize-double-widgets': {},
    'materialize-footer-widgets': {},
    'materialize-collapsibles':{},
    'materialize-collapsibles-widgets': {
      extend: 'apostrophe-pieces-widgets'
    },

    //Production modules
    'apostrophe-seo': {},
    'apostrophe-open-graph': {},
    'apostrophe-global': {
      seoGoogleFields: true
    },
    'apostrophe-site-map': {
      // array of doc types you do NOT want
      // to include, even though they are
      // accessible on the site. You can also
      // do this at the command line.
      excludeTypes: []
    },

    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }
  }
});
