module.exports = {
  extend: 'apostrophe-pieces',
  name: 'collapsible',
  label: 'Collapsible',
  pluralLabel: 'materialize-collapsibles',
  contextualOnly: false,
  addFields: [
    {
      name: 'title',
      type: 'string',
      required: true,
      contextual: true
    },
    {
      name: 'slug',
      type: 'string',
      required: true,
      contextual: true
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'string'
    },
    {
      name: 'header',
      label: 'Header',
      type: 'string',
      required: true
    },
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
    }
  ],
  arrangeFields: [
  {
    name: 'admin',
    label: 'Administrative',
    fields: [ 'published', 'tags' ]
  },
  {
    name: 'content',
    label: 'Biographical',
    fields: [ 'icon', 'header' , 'text', 'date']
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
    self.beforeSave = function(req, piece, options, callback) {
      piece.title = piece.header;
      return callback();
    };
  }
};
