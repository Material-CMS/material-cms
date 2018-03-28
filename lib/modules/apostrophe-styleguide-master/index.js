module.exports = {
  extend: 'apostrophe-custom-pages',
  name: 'styleguide',
  alias: 'styleguide',

  construct: function(self, options) {
    self.dispatch('/', function(req, callback) {
      req.template = self.renderer('styleguide');
      return callback(null);
    });

    self.apos.pages.park({
      title: 'Styleguide',
      type: 'styleguide',
      slug: '/styleguide',
      published: true,
      orphan: true
    });
  },

  afterConstruct: function(self) {
    // Vendors first
    self.pushAsset('stylesheet', 'vendor/prism', { when: 'always' });
    self.pushAsset('script', 'vendor/prism', { when: 'always' });

    // Core
    self.pushAsset('stylesheet', 'styleguide', { when: 'always' });
    self.pushAsset('script', 'styleguide', { when: 'always' });
  }
};
