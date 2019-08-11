module.exports = {
  extend: 'apostrophe-pieces',
  name: 'carousel',
  label: 'Carousel',
  pluralLabel: 'Carousels',
  addFields: [
    {
      name: 'title',
      label: 'Carousel Title',
      type: 'string',
      help: 'This Title will not show up in carousel, only for reference',
    },
    {
      name: 'carousel',
      label: 'Carousel',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: [
              'Styles',
              'Bold',
              'Italic',
              'Blockquote',
              'BulletedList',
              'Link'
            ],
            styles: [
              { name: 'Meta', element: 'h5', attributes: { class: 'accent-color' } },
              { name: 'Flow Text', element: 'p', attributes: { class: 'flow-text' } },
              { name: 'Flow Text Centered', element: 'p', attributes: { class: 'flow-text' }, styles: { 'text-align': 'center'} },
              { name: 'Centered', element: 'p', styles: { 'text-align': 'center'} }
            ],
            controls: {
              movable: true,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
          },
          'card': {
           aspectRatio: [ 4, 4 ],
           size: 'one-third',
            controls: {
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
          }
         }
       }
    },
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'carousel'] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] }
  ]
};
