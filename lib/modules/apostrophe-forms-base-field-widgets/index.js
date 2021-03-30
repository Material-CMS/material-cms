module.exports = {
  beforeConstruct: function (self, options) {
    options.addFields = [
      {
        name: 'icon',
        type: 'string',
        label: 'Icon Prefix',
        help: 'Add an icon prefix to field (name it exactly like in material icon set e.g. account_circle)',
      }
    ].concat(options.addFields || []);

    options.arrangeFields = [
      {
        name: 'settings',
        label: 'Field settings',
        fields: [
          'fieldLabel',
          'fieldName',
          'required',
          'icon'
        ]
      }
    ].concat(options.arrangeFields || []);
  }
};
