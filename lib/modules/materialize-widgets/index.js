module.exports = {
  extend: 'apostrophe-widgets',
  extend: 'apostrophe-link-widgets',
  label: 'Double Widget',
  contextualOnly: true,
    addFields: [
      //Left fields
      {
        name: 'imageLeft',
        type: 'area'
      },
      {
        name: 'titleLeft',
        type: 'area'
      },
      {
        name: 'contentLeft',
        type: 'area'
      },
      //Right fields
      {
        name: 'imageRight',
        type: 'area'
      },
      {
        name: 'titleRight',
        type: 'area'
      },
      {
        name: 'contentRight',
        type: 'area'
      },
    ]
  };
