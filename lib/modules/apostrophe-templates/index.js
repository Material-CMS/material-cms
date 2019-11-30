const minify = require('html-minifier').minify;
const minifyOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true
};

module.exports = {
  construct: function (self, options) {
    const superRenderBody = self.renderBody;
    self.renderBody = function (req, type, s, data, module) {
      return minify(superRenderBody(req, type, s, data, module), minifyOptions);
    };
  }
};
