module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'hideContactButton',
        type: 'boolean',
        label: 'Activate Page Contact Button',
        help: 'Hide the contact button which can be activated in global for this specific page (default: No)',
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
          'shadow'
        ]
      }
    ].concat(options.arrangeFields || []);
  }
};
