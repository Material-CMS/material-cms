// Add additional fields to all pages
module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'shadow',
        type: 'boolean',
        label: 'Element Shadow',
        help: 'Choose page elements have shadow. (default: Yes)',
        def: true
      }
    ].concat(options.addFields || []);
  }
};
