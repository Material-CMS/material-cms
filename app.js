var path = require('path');

var apos = require('apostrophe')({
  shortName: 'fullpage-cms',
  baseUrl: process.env.BASE_URL,

  modules: {

    //Style modules
    'apostrophe-video-widgets': {},
    'apostrophe-favicons': {},
    'card-widgets': {},
    'double-widgets': {},
    'events': {},
    'events-widgets': {},
    'materialize': {},
    'sections': {},
    'sections-widgets': {},
    'texts': {},
    'texts-widgets': {},
    'video-widgets': {},

    //CSS in context editing
    'apostrophe-palette-widgets': {},
    'apostrophe-palette': {},
    'apostrophe-palette-global': {
      paletteFields: [
        {
          name: 'backgroundColor',
          label: 'Background color of the website',
          type: 'color',
          selector: 'body',
          property: 'background-color',
        },
        {
          name: 'mainColor',
          label: 'Main Color',
          type: 'color',
          selector: [
            'nav',
            '.card',
            '.card-content',
            '.collapsible-body',
            '.collapsible-header'
          ],
          property: 'background-color',
        },
        {
          name: 'accentColor',
          label: 'Accent Color',
          type: 'color',
          selector: [
            '.text-color',
            '.card-image',
          ],
          property: 'color',
        },
        {
          name: 'headerBottomPadding',
          label: 'space between image header and widget',
          type: 'range',
          selector: '.header',
          property: 'padding-bottom',
          min: 0,
          max: 10,
          step: 0.1,
          unit: 'rem',
        }
      ]
    },

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

    // Serve Attacments over SSL only
    'apostrophe-attachments': {
      uploadfs: {
        https: true
      }
    },

    //Templates
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }
  }
});
