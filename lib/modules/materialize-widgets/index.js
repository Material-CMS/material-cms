module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Columns',
  contextualOnly: true,
    addFields: [
      {
        name: 'areaLeft',
        type: 'area',
        label: 'Left Area',
      },
      {
        name: 'areaRight',
        type: 'area',
        label: 'Right Area',
      }
    ]
  };
