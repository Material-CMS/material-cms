var path = require('path');

var apos = require('apostrophe')({
  shortName: 'fullpage-cms',
  baseUrl: process.env.BASE_URL,

  modules: {

    //Style modules
    'fullpage': {},
    'apostrophe-video-widgets': {},
    'apostrophe-favicons': {},
    'background-widgets': {},
    'materialize': {},
    'texts': {},
    'texts-widgets': {},
    'materialize-video-widgets': {},
    'materialize-card-widgets': {},
    'materialize-double-widgets': {},
    'materialize-events': {},
    'materialize-events-widgets': {},
    //Production modules
    'apostrophe-seo': {},
    'apostrophe-open-graph': {},
    'apostrophe-global': {
      seoGoogleFields: true
    },
    'apostrophe-site-map': {
      excludeTypes: []
    },
    'apostrophe-optimizer': {
      enable: true,
      stats: false,
      debug: false
    },
    'apostrophe-favicons': {},
    'apostrophe-favicons-global': {
      destinationDir: '/fav/',
      faviconConfig : {
        icons: {
          windows: false
        }
      }
    },
    //Templates
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }
  }
});
