module.exports = {
  beforeConstruct: function (self, options) {
    options.addFields = [
      {
        name: 'url',
        type: 'url',
        label: 'Url',
        help: 'Add an url to the field (this is useful for link to data protection disclamers)',
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
          'icon',
          'url'
        ]
      }
    ].concat(options.arrangeFields || []);
  }
};
