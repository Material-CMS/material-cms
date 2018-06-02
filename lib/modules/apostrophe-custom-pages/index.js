module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'privacy',
        label: 'Privacy',
        type: 'string',
        textarea: true
      },
      {
        name: 'impressum',
        label: 'Impressum',
        type: 'string',
        textarea: true
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
      },
      // Section Options
      {
        name: 'section1_title',
        label: 'First Section Title',
        type: 'string'
      },
      {
        name: 'section2_title',
        label: 'Second Section Title',
        type: 'string'
      },
      {
        name: 'section3_title',
        label: 'Third Section Title',
        type: 'string'
      },
      {
        name: 'section4_title',
        label: 'Forth Section Title',
        type: 'string'
      },
      {
        name: 'section2_active',
        label: 'Second Section Enable',
        type: 'boolean'
      },
      {
        name: 'section3_active',
        label: 'Third Section Enable',
        type: 'boolean'
      },
      {
        name: 'section4_active',
        label: 'Fourth Section Enable',
        type: 'boolean'
      }
    ]
    options.arrangeFields = [
      {
        name: 'sections',
        label: 'Section Options',
        fields: [ 'section1_title', 'section2_title', 'section2_active', 'section3_title', 'section3_active', 'section4_title', 'section4_active' ]
      },
      {
        name: 'email',
        label: 'Email',
        fields: [ 'arn', 'mailto' ]
      },
      {
        name: 'info',
        label: 'Privacy & Impressum',
        fields: [ 'privacy', 'impressum' ]
      }
    ]
  }
};
