module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-double',
  label: 'Material Double',
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
