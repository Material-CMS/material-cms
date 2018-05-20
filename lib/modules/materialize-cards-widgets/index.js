module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-cards',
  label: 'Material Cards',
  contextualOnly: true,
    addFields: [
      {
        name: 'imageLeft',
        type: 'area'
      },
      {
        name: 'imageRight',
        type: 'area'
      }
    ]
  };
