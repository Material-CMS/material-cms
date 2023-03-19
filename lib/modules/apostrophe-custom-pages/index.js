// Add additional fields to all pages
module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'hideContactButton',
        type: 'boolean',
        label: 'Hide Contact Button on Page',
        help: 'Hide the contact button which can be activated in global for this specific page (default: No)',
        def: false
      }
    ].concat(options.addFields || []);
  }
};
