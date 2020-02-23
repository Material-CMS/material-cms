module.exports = {
  extend: 'apostrophe-widgets',
  name: 'footer',
  label: 'Footer Widget',
  contextualOnly: true,

  construct: function(self, options) {
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
