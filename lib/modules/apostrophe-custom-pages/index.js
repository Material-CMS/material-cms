module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'buttonOn',
        type: 'boolean',
        label: 'Contact Info Button On',
        help: 'Thurn On button on the lower right corner with your display your contact Info',
        def: false
      },
      {
        name: 'shadow',
        type: 'boolean',
        label: 'Shadow for Cards',
        help: 'Choose shadow for cards on page ( default: true )',
        def: true
      },
      {
        name: 'links',
        label: 'Links',
        type: 'array',
        help: 'Choose External Links for Main Menu',
        titleField: 'name',
        schema: [
          {
            name: 'name',
            type: 'string',
            label: 'Name'
          },
          {
            type: 'url',
            name: 'url',
            label: 'Links to Other Pages',
          },
          {
            name: 'icon',
            type: 'string',
            label: 'Icon'
          },
        ]
      }
    ].concat(options.addFields || []);

    options.arrangeFields = [
      {
        name: 'options',
        label: 'Options',
        fields: ['buttonOn', 'shadow', 'links']
      }
    ].concat(options.arrangeFields || []);
  }
};
