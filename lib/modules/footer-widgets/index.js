module.exports = {
  extend: 'apostrophe-widgets',
  name: 'footer',
  label: 'Footer Widget',
  addFields: [
    {
      name: 'copyright',
      label: 'Copyright Info',
      type: 'string',
      help: 'Add your company name'
    },
    {
      name: 'creation_date',
      label: 'Creation Date',
      type: 'date',
      help: 'Add the creation date of your webapp',
      pikadayOptions: {
        format: 'YYYY'
      }
    },
    {
      name: 'aboutTitle',
      label: 'About Fields Title',
      type: 'string',
      help: 'Rename title of about fields in footer to something more personal than "About".'
    },
    {
      name: 'footerPrivacy',
      label: 'Footer Privacy Button',
      type: 'string',
      help: 'Rename footer privacy button to something other than "Privacy".'
    },
    {
      name: 'footerLegal',
      label: 'Footer Legal Button',
      type: 'string',
      help: 'Rename footer legal button to something other than "Legal".'
    }
  ],
  construct: function(self, options) {
    // Add lean and always scripts
    if (self.apos.assets.options.lean) {
      if (self.options.player) {
        self.pushAsset('script', 'lean', { when: 'lean' });
      }
    } else {
      self.pushAsset('script', 'always', { when: 'always' });
    }
    // Render own Routes for injecting footer and legal content as iframes
    // THIS IS NICE! to add own routes to widget
    self.renderRoute('get', 'legal', function(req, res, next) {
      return next(null, {
        template: 'legal'
      });
    });
    self.renderRoute('get', 'privacy', function(req, res, next) {
      return next(null, {
        template: 'privacy'
      });
    });
  }
};
