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
      },
      // Section Colors
      {
        type: 'color',
        name: 'nav_color',
        label: 'Nav Color'
      },
      {
        type: 'color',
        name: 'acc_color',
        label: 'Accent Color'
      },
      {
        type: 'color',
        name: 'sec1_color',
        label: 'First Section Color'
      },
      {
        type: 'color',
        name: 'sec2_color',
        label: 'Second Section Color'
      },
      {
        type: 'color',
        name: 'sec3_color',
        label: 'Third Section Color'
      },
      {
        type: 'color',
        name: 'sec4_color',
        label: 'Fourth Section Color'
      },
      {
        type: 'color',
        name: 'sec5_color',
        label: 'Fifth Section Color'
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
        name: 'colors',
        label: 'Colors',
        fields: [ 'nav_color', 'acc_color', 'sec1_color', 'sec2_color', 'sec3_color', 'sec4_color', 'sec5_color' ]
      },
      {
        name: 'info',
        label: 'Privacy & Impressum',
        fields: [ 'privacy', 'impressum' ]
      }
    ]
  }
};
