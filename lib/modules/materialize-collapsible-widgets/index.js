module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-collapsible',
  label: 'Material Collapsible',
  contextualOnly: false,
    addFields: [
      // Field 1
      {
        name: 'header1',
        label: 'Header one',
        type: 'string'
      },
      {
        name: 'text1',
        label: 'Description one',
        type: 'string'
      },
      {
        name: 'date1',
        label: 'Date one',
        type: 'date',
        def: null
      },
      // Field 2
      {
        name: 'icon2',
        label: 'Icon two',
        type: 'string'
      },
      {
        name: 'header2',
        label: 'Header two',
        type: 'string'
      },
      {
        name: 'text2',
        label: 'Description two',
        type: 'string'
      },
      {
        name: 'date2',
        label: 'Date two',
        type: 'date',
        def: null
      },
      // Field 3
      {
        name: 'icon3',
        label: 'Icon three',
        type: 'string'
      },
      {
        name: 'header3',
        label: 'Header three',
        type: 'string'
      },
      {
        name: 'text3',
        label: 'Description three',
        type: 'string'
      },
      {
        name: 'date3',
        label: 'Date three',
        type: 'date',
        def: null
      },
      // Field 4
      {
        name: 'icon4',
        label: 'Icon four',
        type: 'string'
      },
      {
        name: 'header4',
        label: 'Header four',
        type: 'string'
      },
      {
        name: 'text4',
        label: 'Description four',
        type: 'string'
      },
      {
        name: 'date4',
        label: 'Date four',
        type: 'date',
        def: null
      }
    ],

    //Create functions for pushing assets and create singleton in browser
    afterConstruct: function(self) {
    self.pushAssets();
    },

    //load third party styles and scripts
    //init has all settings for fullpage
    construct: function(self, options) {
      self.pushAssets = function() {
        self.pushAsset('stylesheet', 'styles', { when: 'always' });
        self.pushAsset('script', 'init', { when: 'always' });
      };
    }
};
console.log('Materialize collapsible loaded')
