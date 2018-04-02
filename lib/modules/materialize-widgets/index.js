module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Double Widget',
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
