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
      name: 'vendor/materialize.min'
    },
    {
      name: 'vendor/lethargy.min'
    },
    {
      name: 'vendor/smartscroll.min'
    },
    {
      name: 'materialize-components'
    },
    {
      name: 'scroll-mechanics'
    }
  ]
};
