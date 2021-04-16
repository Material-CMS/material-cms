var path = require('path');

var apos = require('apostrophe')({
  shortName: 'material-cms',
  modules: {
    // Lean frontend
    'apostrophe-assets': {
        lean: true
    },
    // Ordering Module for Pieces
    'apostrophe-pieces-orderings-bundle': {},
    // Custom Modules
    'card-widgets': {},
    'btn-widgets':{
      player: true
    },
    'double-widgets': {},
    'triple-widgets': {},
    'quadruple-widgets': {},
    'events': {},
    'events-widgets': {
      player: true
    },
    'footer-widgets':{
      player : true
    },
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
    'navigations':{},
    'navigations-widgets': {
      player: true
    },
    'link-widgets': {},
    'link-page-widgets': {},
    'link-subpages-widgets': {},
    'people': {
      ordering: true
    },
    'people-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'people-pages': {
      orderings: true
    },
    'people-widgets': {},
    'sections': {
      orderings: true
    },
    'sections-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'sections-pages': {
      orderings: true
    },
    'sections-widgets': {
      player: true
    },
    'share-widgets': {},
    'shape-divider-path-widgets': {},
    'slider-widgets':{
      player: true
    },
    'swiper-widgets':{
      player: true
    },
    'tables': {
      orderings: true
    },
    'tables-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'tables-pages': {
      orderings: true
    },
    'tables-widgets': {},
    'texts': {
      orderings: true
    },
    'texts-orderings': {
      extend: 'apostrophe-pieces-orderings'
    },
    'texts-pages': {
      orderings: true
    },
    'texts-carousels-widgets': {},
    'texts-widgets': {
      player: true
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
      noPriority: true,
      excludeTypes: [
        'apostrophe-global',
        'contact-form'

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
    'apostrophe-video-widgets': {
      player: true
    },
    // Serve Attacments over SSL only
    'apostrophe-attachments': {
      uploadfs: {
        https: true
      }
    },
    // Allow svgs
    'apostrophe-attachments': {
      svgImages: true,
      /*
      addImageSizes: [{
        name: 'side',
        width: 380,
        height: 600
      }]
      */
    },
    // Forms
    'apostrophe-forms': {
      disableBaseStyles: true,
      optionLabelPosition: 'last'
    },
    'apostrophe-forms-widgets': {},
    'apostrophe-forms-text-field-widgets': {},
    'apostrophe-forms-textarea-field-widgets': {},
    'apostrophe-forms-file-field-widgets': {},
    'apostrophe-forms-select-field-widgets': {},
    'apostrophe-forms-radio-field-widgets': {},
    'apostrophe-forms-checkboxes-field-widgets': {},
    'apostrophe-forms-boolean-field-widgets': {},
    'apostrophe-forms-conditional-widgets': {},
    // Templates
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }

  // << End of Modules
  }
});
