// This configures the apostrophe-assets module to push a 'site.less'
// stylesheet by default, and to use jQuery 3.x
module.exports = {
  stylesheets: [
    {
      name: 'vendor/materialize.min'
    },
    {
      name: 'apostrophe-overrides'
    },
    {
      name: 'materialize-overrides'
    }
  ],
  scripts: [
    {
      name: 'materialize.old'
    },
    {
      name: 'init'
    },
    {
      name: 'scroll'
    },
    {
      name: 'pagination'
    }
  ]
};
