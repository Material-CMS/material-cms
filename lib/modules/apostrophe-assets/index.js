// This configures the apostrophe-assets module to push a 'site.less'
// stylesheet by default, and to use jQuery 3.x
module.exports = {
  jQuery: 3,
  stylesheets: [
    { name: 'vendor/featherlight' },
    { name: 'vendor/materialize' },
    { name: 'materialize-overrides' },
    { name: 'apostrophe-overrides', when: 'user' },
  ],
  scripts: [
    { name: 'vendor/featherlight.min' },
    { name: 'pagination' },
    { name: 'vendor/materialize/vendor/cash' },
    { name: 'vendor/materialize/components/component' },
    { name: 'vendor/materialize/components/global' },
    { name: 'vendor/materialize/vendor/anime.min' },
    { name: 'vendor/materialize/components/buttons' },
    { name: 'vendor/materialize/components/cards' },
    { name: 'vendor/materialize/components/carousel' },
    { name: 'vendor/materialize/components/collapsible' },
    { name: 'vendor/materialize/components/component' },
    { name: 'vendor/materialize/components/dropdown' },
    { name: 'vendor/materialize/components/forms' },
    { name: 'vendor/materialize/components/modal' },
    { name: 'vendor/materialize/components/sidenav' },
    { name: 'vendor/materialize/components/slider' },
    { name: 'vendor/materialize/components/tabs' },
    { name: 'vendor/materialize/components/waves' },
    { name: 'vendor/materialize/options' }
  ]
};
