// Minify HTML document
// TODO: check for possible breaking changes by overriding the rederBody function
const minify = require('html-minifier').minify;
const minifyOptions = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: false,
	removeComments: false,
	minifyCSS: true
};

module.exports = {
	construct: function(self, options) {
		if (options.minify === true) {
			const superRenderBody = self.renderBody;
			self.renderBody = function(req, type, s, data, module) {
				return minify(superRenderBody(req, type, s, data, module), minifyOptions);
			};
		}
	}
};
