const minify = require('html-minifier').minify;
const minifyOptions = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  preserveLineBreaks: true
};

module.exports = {
  construct: function (self, options) {
    if (options.minify) {
      const superRenderBody = self.renderBody;
      self.renderBody = function (req, type, s, data, module) {
        const body = superRenderBody(req, type, s, data, module);
        return self.renderDepth === 0 ? minify(body, minifyOptions) : body;
      };
    }
  }
};
