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
      help: 'This is the minimum, use only a title for a header',
      required: true,
    },
    {
      name: 'titleColor',
      label: 'Title Color',
      type: 'color',
      help: 'Overrides Accent Color'
    },
    {
      name: 'titleShow',
      label: 'Show Title',
      type: 'boolean',
      help: 'Set false to hide title (default is true)',
      def: true
    },
    {
      name: 'description',
      type: 'area',
      label: 'Description',
      help: 'Add description for your text widget',
      options: {
        limit: 1,
        widgets: {
          'apostrophe-video': {
            controls: {
              movable: true,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
          },
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
      type: 'area',
      label: 'Content',
      help: 'Add more detailed text for "more" or "read" button depending on blog option',
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
          'apostrophe-video': {
            controls: {
              movable: true,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
          },
          'card': {
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
      name: 'backColor',
      label: 'Background Color',
      type: 'color',
      help: 'Overrides Main Color'
    },
    {
      name: 'buttonText',
      type: 'string',
      label: 'Button Text',
      help: 'Change text of bottom button to something more personal than "more" or "read"'
    },
    {
      name: 'extraLink',
      label: 'Extra Link',
      type: 'url',
      help: 'Add an extra link to the bottom bar (default text: link)'
    },
    {
      name: 'linkText',
      type: 'string',
      label: 'Link Text',
      help: 'Change text extra link to something more personal than "link"'
    },
    {
      name: 'blogOn',
      type: 'select',
      label: 'Blog On',
      help: 'Change more button to Blog ( ONLY WORKS WITH ACTIVE TEXT PAGE )',
      choices: [
        {
          label: 'No',
          value: false,
          def: true,
          showFields: [ 'sideImage', 'sideImageLeft' ]
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
      type: 'area',
      label: 'Side Image',
      help: 'Add side image to text',
      options: {
        limit: 1,
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
       name: 'sideImageLeft',
       type: 'boolean',
       label: 'Side Image Left',
       help: 'Move side image the left'
     },
     {
       name: 'topImage',
       label: 'Top Image',
       type: 'area',
       help: 'Add top image for blog teaser',
       options: {
         limit: 1,
         widgets: {
           'apostrophe-video': {
             controls: {
               movable: true,
               cloneable: false,
               removable: true,
               position: 'top-right'
             }
           },
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
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'description', 'text']
    },
    {
      name: 'colors',
      label: 'Colors',
      fields: [ 'titleColor', 'backColor' ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [ 'sideImage', 'sideImageLeft', 'topImage', 'extraLink', 'linkText', 'titleShow', 'buttonText', 'blogOn' ]
    },
    {
      name: 'info',
      label: 'Info',
      fields: [ 'slug', 'tags', 'published' ]
    }
  ]
};
