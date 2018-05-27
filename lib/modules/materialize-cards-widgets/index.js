module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-cards',
  label: 'Cards Widget',
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
