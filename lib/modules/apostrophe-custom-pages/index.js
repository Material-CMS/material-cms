module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      // Section Options
      { name: 'section1_title', label: 'First Section Title', type: 'string', required: true },
      { name: 'section2_title', label: 'Second Section Title', type: 'string' },
      { name: 'section3_title', label: 'Third Section Title',  type: 'string' },
      { name: 'section4_title', label: 'Forth Section Title',  type: 'string', },
      // Section Activators
      { name: 'section2_active', label: 'Second Section Enable', type: 'boolean' },
      { name: 'section3_active', label: 'Third Section Enable', type: 'boolean' },
      { name: 'section4_active', label: 'Fourth Section Enable', type: 'boolean' },
      // Section Colors
      { type: 'color', name: 'nav_color', label: 'Nav Color', help: 'Navigation color select' },
      { type: 'color', name: 'acc1_color', label: 'First Accent Color', help: 'Select color header texts' },
      { type: 'color', name: 'acc2_color', label: 'Second Accent Color', help: 'Select color Icons' },
      { type: 'color', name: 'sec1_color', label: 'First Section Color', help: 'Select color first section' },
      { type: 'color', name: 'sec2_color', label: 'Second Section Color', help: 'Select color second section' },
      { type: 'color', name: 'sec3_color', label: 'Third Section Color', help: 'Select color third section' },
      { type: 'color', name: 'sec4_color', label: 'Fourth Section Color', help: 'Select color fourth section' },
      { type: 'color', name: 'sec5_color', label: 'Footer Color', help: 'Select color fifth section' },
      //Sections Backgrounds
      {
        name: '_image_sec1',
        type: 'joinByOne',
        withType: 'apostrophe-image',
        label: 'First Section Image',
        filters: {
         projection: {
           attachment: true,
           description: true,
           title: true
          }
        }
      },
      {
        name: '_image_sec2',
        type: 'joinByOne',
        withType: 'apostrophe-image',
        label: 'Second Section Image',
        filters: {
         projection: {
           attachment: true,
           description: true,
           title: true
          }
        }
      },
      {
        name: '_image_sec3',
        type: 'joinByOne',
        withType: 'apostrophe-image',
        label: 'Third Section Image',
        filters: {
         projection: {
           attachment: true,
           description: true,
           title: true
          }
        }
      },
      {
        name: '_image_sec4',
        type: 'joinByOne',
        withType: 'apostrophe-image',
        label: 'Fourth Section Image',
        filters: {
         projection: {
           attachment: true,
           description: true,
           title: true
          }
        }
      }
    ]
    //Field Arrangement
    options.arrangeFields = [
      {
        name: 'sections',
        label: 'Section Options',
        fields: [
          'section1_title',
          'section2_title',
          'section2_active',
          'section3_title',
          'section3_active',
          'section4_title',
          'section4_active'
        ]
      },
      {
        name: 'email',
        label: 'Email',
        fields: [
          'arn',
          'mailto'
        ]
      },
      {
        name: 'colors',
        label: 'Color',
        fields: [
          'nav_color',
          'acc1_color',
          'acc2_color',
          'sec1_color',
          'sec2_color',
          'sec3_color',
          'sec4_color',
          'sec5_color',
          '_image_sec1',
          '_image_sec2',
          '_image_sec3',
          '_image_sec4',
        ]
      },
      {
        name: 'back',
        label: 'Background',
        fields: [
          '_image_sec1',
          '_image_sec2',
          '_image_sec3',
          '_image_sec4',
        ]
      }
    // End Arrangement
    ]
  }
};
