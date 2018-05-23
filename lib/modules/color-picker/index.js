var _ = require('lodash');

module.exports = {

  afterConstruct: function(self) {
    self.addFieldType();
    self.pushAssets();
    self.pushCreateSingleton();
  },

  construct: function(self, options) {

    self.addFieldType = function() {
      self.apos.schemas.addFieldType({
        name: 'color-picker',
        converters: {
          csv: function(req, data, name, object, field, callback) {
            var def = field.def || 'rgb(0, 0, 0)';
            var s = self.apos.launder.string(data[name], def);
            var matches = s.match(/^rgb\((.*?)\)$/);
            if (!matches) {
              return safety();
            }
            var channels = matches[1].split(/,/);
            if (channels.length !== 3) {
              return safety();
            }
            channels = _.map(channels, function(s) {
              return self.apos.launder.integer(s, 0);
            });
            object[name] = 'rgb(' + channels.join(',') + ')';
            return setImmediate(callback);

            function safety() {
              object[name] = def;
              return setImmediate(callback);
            }
          },
          form: 'csv'
        },
        partial: self.fieldTypePartial
      });
    };

    self.fieldTypePartial = function(data) {
      return self.partial('field', data);
    };

    self.pushAssets = function() {
      self.pushAsset('script', 'user', { when: 'user' });
      self.pushAsset('stylesheet', 'user', { when: 'user' });
    };

  }
};
