module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'hideContactButton',
        type: 'boolean',
        label: 'Hide Contact Button on Page',
        help: 'Hide the contact button which can be activated in global for this specific page (default: No)',
        def: false
      },
      {
        name: 'hideFooter',
        type: 'boolean',
        label: 'Hide Footer on Page',
        help: 'Hide the footer which can be activated in global for this specific page (default: No)',
        def: false
      },
      {
        name: 'shadow',
        type: 'boolean',
        label: 'Shadow for Cards',
        help: 'Choose shadow for cards on page (default: Yes)',
        def: true
      }
    ].concat(options.addFields || []);

    options.arrangeFields = [
      {
        name: 'options',
        label: 'Options',
        fields: [
          'hideContactButton',
          'hideFooter',
          'shadow'
        ]
      }
    ].concat(options.arrangeFields || []);
  }
};
