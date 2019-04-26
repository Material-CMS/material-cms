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
      name: 'vendor/materialize/cash'
    },
    {
      name: 'vendor/materialize/component'
    },
    {
      name: 'vendor/materialize/global'
    },
    {
      name: 'vendor/materialize/anime.min'
    },
    {
      name: 'vendor/materialize/buttons'
    },
    {
      name: 'vendor/materialize/cards'
    },
    {
      name: 'vendor/materialize/collapsible'
    },
    {
      name: 'vendor/materialize/dropdown'
    },
    {
      name: 'vendor/materialize/materialbox'
    },
    {
      name: 'vendor/materialize/sidenav'
    },
    {
      name: 'vendor/materialize/slider'
    },
    {
      name: 'vendor/materialize/init'
    },
    {
      name: 'scroll'
    },
    {
      name: 'pagination'
    }
  ]
};
