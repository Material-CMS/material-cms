module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-footer',
  label: 'Material Footer',
  contextualOnly: false,
  addFields: [
    {
      name: 'text',
      label: 'Description',
      type: 'string'
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      def: null
    },
    {
      name: 'copy',
      label: 'Copyright',
      type: 'string'
    },
    {
      name: 'link',
      label: 'Copyright Link',
      type: 'string'
    }
  ],
    arrangeFields: [
    {
      name: 'content',
      label: 'Content',
      fields: [  'text' ]
    },
    {
      name: 'copyright',
      label: 'Copyright',
      fields: [  'date', 'copy' ,'link' ]
    }
  ],
  //Create functions for pushing assets to browser
  afterConstruct: function(self) {
  self.pushAssets();
  },

  //load third party styles and scripts
  //init has all settings for fullpage
  construct: function(self, options) {
    self.pushAssets = function() {
      self.pushAsset('stylesheet', 'footer', { when: 'always' });
    };
  }
};
