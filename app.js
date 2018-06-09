var path = require('path');

var apos = require('apostrophe')({
  shortName: 'fullpage-cms',
  baseUrl: process.env.BASE_URL,

  modules: {

    //Style modules
    'fullpage': {},
    'apostrophe-video-widgets': {},
    'color-picker': {},
    'background-widgets': {},
    'materialize': {},
    'materialize-video-widgets': {},
    'materialize-card-widgets': {},
    'materialize-text-widgets': {},
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
      stats: false,
      debug: false
    },
    'apostrophe-favicons': {},
    'apostrophe-favicons-global': {
      destinationDir: '/fav/',
      // Defaults to `/favicons/`. This is an uploadfs path, it will become /uploads/favicons/ on a server

      tempDir: 'temp',
      // Defaults to `tempAposFavicons`. Directory where files are temporarily written before being passed to uploadfs. This is your root project directory. Omit leading slash

      faviconConfig : {
        icons: {
          windows: false
        }
      }
      // Configuration for favicon module, see options here https://github.com/evilebottnawi/favicons#usage
      // **NOTE** The `path` option is automatically figured out by the module, no need to set it.
    },
    //Templates
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }
  }
});
