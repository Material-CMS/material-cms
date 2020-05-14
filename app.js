var path = require('path');

var apos = require('apostrophe')({
  shortName: 'fullpage-cms',
  modules: {
    // Ordering Module for Pieces
    'apostrophe-pieces-orderings-bundle': {},
    // Custom Modules
    'apostrophe-video-widgets': {},
    'card-widgets': {},
    'contact-form': {},
    'contact-form-widgets': {},
    'btn-widgets':{},
    'double-widgets': {},
    'events': {},
    'events-widgets': {},
    'footer-widgets':{},
    'galleries':{
      orderings: true
    },
    'galleries-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'galleries-pages': {
      orderings: true
    },
    'galleries-widgets': {},
    'nav-widgets': {},
    'people': {},
    'people-pages': {},
    'people-widgets': {},
    'sections': {
      orderings: true
    },
    'sections-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'sections-infinite-pages': {
      orderings: true
    },
    'sections-pages': {
      orderings: true
    },
    'sections-widgets': {},
    'share-widgets':{},
    'slider-widgets':{},
    'tables': {},
    'tables-widgets': {},
    'texts': {
      orderings: true
    },
    'texts-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'texts-carousels-widgets': {},
    'texts-widgets': {},
    'texts-pages': {
      orderings: true
    },
    'video-widgets': {},
    // CSS in context editing
    'apostrophe-palette-widgets': {},
    'apostrophe-palette': {},
    'apostrophe-palette-global': {},
    // Production Modules
    'apostrophe-db': {
      connect: {
        useUnifiedTopology: true
      }
    },
    'apostrophe-caches-redis': {},
    'apostrophe-caches': {
      redis: {}
    },
    'apostrophe-seo': {},
    'apostrophe-open-graph': {},
    'apostrophe-global': {
      seoGoogleFields: true
    },
    'apostrophe-site-map': {
      excludeTypes: [
        'apostrophe-global'
      ],
      childPageDepth: 3
    },
    'apostrophe-optimizer': {
      enable: false,
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
    // Serve Attacments over SSL only
    'apostrophe-attachments': {
      uploadfs: {
        https: true
      }
    },
    // Templates
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }

    // Other Example Options
    // Custom Custom Image Size Example
    /*
    'apostrophe-attachments': {
      addImageSizes: [{
        name: 'side',
        width: 380,
        height: 600
      }]
    },
    */

  // << End of Modules
  }
});
