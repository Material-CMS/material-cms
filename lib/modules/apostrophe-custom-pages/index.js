module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'privacy',
        label: 'Privacy',
        type: 'singleton',
        widgetType: 'apostrophe-rich-text',
        options: {
          limit: 1
        }
      },
      {
        name: 'impressum',
        label: 'Impressum',
        type: 'singleton',
        widgetType: 'apostrophe-rich-text',
        options: {
          limit: 1
        }
      },
      {
        name: 'arn',
        label: 'Sender ARN',
        type: 'string'
      },
      {
        name: 'mailto',
        label: 'Sender Mail',
        type: 'string'
      }
    ]
    options.arrangeFields = [
      {
        name: 'email',
        label: 'Email',
        fields: [ 'arn', 'mailto' ]
      },
      {
        name: 'info1',
        label: 'Privacy',
        fields: [ 'privacy' ]
      },
      {
        name: 'info2',
        label: 'Impressum',
        fields: [ 'impressum' ]
      }
    ]
  }
};
