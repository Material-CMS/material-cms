module.exports = {
  extend: 'apostrophe-widgets',
  name: 'materialize-card',
  label: 'Image Widget',
  contextualOnly: true,
  addFields: [
    {
      name: 'image',
      type: 'area'
    }
  ]
};
