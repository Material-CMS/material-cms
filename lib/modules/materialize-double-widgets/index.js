module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-double',
  label: 'Double Widget',
  contextualOnly: true,
    addFields: [
      {
        name: 'cardLeft',
        type: 'area'
      },
      {
        name: 'cardRight',
        type: 'area'
      }
  ]
};
