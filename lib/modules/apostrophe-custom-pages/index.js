module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'privacy',
        label: 'Privacy',
        type: 'string',
        textarea: true,
        help: 'Put your legal and data protection here'
      },
      {
        name: 'impressum',
        label: 'Impressum',
        type: 'string',
        textarea: true,
        help: 'Put adress, phone and other info here'
      },
      {
        name: 'arn',
        label: 'Sender ARN',
        type: 'string',
        help: 'String for connecting AWS SES services'
      },
      {
        name: 'mailto',
        label: 'Sender Mail',
        type: 'string',
        help: 'AWS SES sender email'
      },
      // Section Options
      {
        name: 'section1_title',
        label: 'First Section Title',
        type: 'string',
        required: true
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
        type: 'string',
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
        label: 'Nav Color',
        help: 'Navigation color select'
      },
      {
        type: 'color',
        name: 'acc1_color',
        label: 'First Accent Color',
        help: 'Select color for header texts'
      },
      {
        type: 'color',
        name: 'acc2_color',
        label: 'Second Accent Color',
        help: 'Select color for Icons and other elements'
      },
      {
        type: 'color',
        name: 'sec1_color',
        label: 'First Section Color',
        help: 'Select color for the first section'
      },
      {
        type: 'color',
        name: 'sec2_color',
        label: 'Second Section Color',
        help: 'Select color for the second section'
      },
      {
        type: 'color',
        name: 'sec3_color',
        label: 'Third Section Color',
        help: 'Select color for the third section'
      },
      {
        type: 'color',
        name: 'sec4_color',
        label: 'Fourth Section Color',
        help: 'Select color for the fourth section'
      },
      {
        type: 'color',
        name: 'sec5_color',
        label: 'Fifth Section Color',
        help: 'Select color for the fifth section'
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
        fields: [ 'nav_color', 'acc1_color', 'acc2_color', 'sec1_color', 'sec2_color', 'sec3_color', 'sec4_color', 'sec5_color' ]
      },
      {
        name: 'info',
        label: 'Privacy & Impressum',
        fields: [ 'privacy', 'impressum' ]
      }
    ]
  }
};
