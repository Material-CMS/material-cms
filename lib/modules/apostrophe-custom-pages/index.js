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
  }
};
