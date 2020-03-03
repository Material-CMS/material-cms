module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        type: 'select',
        name: 'align',
        label: 'Title & Description Align',
        help: 'Choose align for title and description (either center, left or right)',
        choices: [
          {
            label: 'Center align',
            value: 'center-align',
            def: true
          },
          {
            label: 'Left Align',
            value: 'left-align'
          },
          {
            label: 'Right Align',
            value: 'right-align'
          }
        ]
      }
    ].concat(options.addFields || [])

    options.arrangeFields = [
      { name: 'basics', label: 'Basics', fields: [ 'attachment', 'title', 'description', 'align' ] },
      { name: 'info', label: 'Info', fields: [ 'credit', 'creditUrl', 'camera', 'slug', 'tags', 'published', 'captureDate' ] },
    ]
  }
}
