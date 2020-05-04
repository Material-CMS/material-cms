module.exports = {
  extend: 'apostrophe-pieces',
  name: 'text',
  label: 'Text',
  style: 'access_alarm',
  pluralLabel: 'Texts',
  contextualOnly: false,
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Remove Title for text widget without header'
    },
    {
      name: 'titleColor',
      label: 'Title Color',
      type: 'color',
      help: 'Remove to set title to Accent Color'
    },
    {
      name: 'backColor',
      label: 'Background Color',
      type: 'color',
      help: 'Remove to set Background to Main Color'
    },
    {
      name: 'extraLink',
      label: 'Extra Link',
      type: 'url',
      help: 'Add an extra link to the bottom bar'
    },
    {
      name: 'description',
      label: 'Description',
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
           }
         }
       }
    },
    {
      name: 'text',
      label: 'Text',
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
           }
         }
       }
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'string',
      help: 'Change text of bottom bar button to something more personal than "more"'
    },
    {
      name: 'linkText',
      label: 'Link Text',
      type: 'string',
      help: 'Change text of bottom bar link to something more personal than "link"'
    },
    {
      name: 'blogOn',
      type: 'select',
      label: 'Blog On',
      help: 'Make Text to Blog Teaser ( ONLY WORKS WITH BLOG PAGE ON SITE! )',
      choices: [
        {
          label: 'No',
          value: false,
          def: true,
          showFields: [ 'sideImage' ]
        },
        {
          label: 'Yes',
          value: true,
          showFields: [ 'topImage' ]
        }
      ]
    },
    {
      name: 'sideImage',
      label: 'Side Image',
      type: 'area',
      options: {
        widgets: {
          'card': {
           aspectRatio: [ 2, 4 ],
           focalPoint: true,
           noHeight: true,
           limit: 1,
           controls: {
             cloneable: false,
             removable: true,
             position: 'top-right'
           }
          }
         }
       }
     },
     {
       name: 'topImage',
       label: 'Top Image',
       type: 'area',
       options: {
         widgets: {
           'card': {
            aspectRatio: [ 3, 1 ],
            focalPoint: true,
            noHeight: true,
            limit: 1,
            controls: {
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
           }
          }
        }
      }
  ],
  arrangeFields: [
    { name: 'basics', label: 'Basics', fields: ['title', 'description', 'text' ] },
    { name: 'colors', label: 'Colors', fields: ['titleColor', 'backColor'] },
    { name: 'options', label: 'Options', fields: ['buttonText', 'linkText', 'extraLink', 'blogOn', 'sideImage', 'topImage' ] },
    { name: 'info', label: 'Info', fields: [ 'slug', 'tags', 'published' ] },
  ]
};
