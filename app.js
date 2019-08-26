var path = require('path');

var apos = require('apostrophe')({
  shortName: 'fullpage-cms',
  baseUrl: process.env.BASE_URL,
  modules: {

    // All Important Stuff!
    // Custom Image size
    'apostrophe-attachments': {
      addImageSizes: [{
        name: 'side',
        width: 380,
        height: 600
      }]
    },
    // Style Modules
    'apostrophe-video-widgets': {},
    'apostrophe-favicons': {},
    'card-widgets': {},
    'carousels': {},
    'carousels-widgets': {},
    'contact-form': {},
    'contact-form-widgets': {},
    'double-widgets': {},
    'events': {},
    'events-widgets': {},
    'footer-widgets':{},
    'sections': {},
    'sections-widgets': {},
    'slides': {},
    'slides-widgets': {},
    'texts': {},
    'texts-widgets': {},
    'video-widgets': {},

    // CSS in context editing
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
          property: 'background-color'
        },
        {
          name: 'navColor',
          label: 'Nav Color',
          type: 'color',
          selector: 'nav',
          property: 'background-color'
        },
        {
          name: 'accentColor',
          label: 'Accent Color',
          type: 'color',
          selector: '.accent-color',
          property: 'color'
        },
        {
          name: 'borderRadius',
          label: 'Round Corners',
          type: 'range',
          selector: [
            '.radius'
          ],
          property: 'border-radius',
          min: 0,
          max: 50,
          step: 1,
          unit: 'px'
        },
        {
          name: 'marginCards',
          label: 'Space Bottom',
          type: 'range',
          selector: '.margin',
          property: [
            'margin-bottom'
          ],
          min: 0,
          max: 50,
          step: 1,
          unit: 'px'
        }
      ]
    },

    // Production Modules
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
    'apostrophe-email': {
      nodemailer: {
        host: process.env.EMAIL_SMTP,
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PW
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

  // << End of Modules
  }
});
