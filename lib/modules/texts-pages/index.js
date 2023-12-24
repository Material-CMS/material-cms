module.exports = {
  extend: 'apostrophe-pieces-pages',
  name: 'texts-pages',
  label: 'Texts Pages',
  perPage: 10,
  addFields: [
    {
      name: 'ajaxAppend',
      type: 'boolean',
      label: 'Activate Ajax Append Mode',
      help: 'Activate the ajax append mode which allows to create infinite scroll layouts (default: No)',
      def: false
    },
    {
      name: 'backgroundColor',
      type: 'color',
      label: 'Page Background Color',
      help: 'Choose a individual page background color. (default: Background color)'
    },
    {
      name: 'blog',
      type: 'select',
      label: 'Blog Text',
      htmlHelp: 'Text content is now opened in a separate page and will be shown as a blog entry with social share buttons.' + '<br />' + '<br />' +
      '<span>only works with text page on your site, so add a new text page under page settings and name it blog for example</span>',
      choices: [
        {
          label: 'No',
          value: false,
          def: true,
          showFields: [
            'buttonTextClose'
          ]
        },
        {
          label: 'Yes',
          value: true,
          showFields: [
            'topImage'
          ]
        }
      ]
    },
    {
      name: 'buttonText',
      type: 'string',
      label: 'Load More or Next button Text',
      help: 'Define text for the button on the end of the page which is eather \'Load More\' or \'Next Page\' depending of Ajax Append Mode (default: \'Load More\')',
    },
    {
      name: 'buttonTextClose',
      type: 'string',
      label: 'Button Text Close',
      help: 'Change text of more button to something more personal than "close".'
    }
  ],
  arrangeFields: [
    {
      name: 'appearance',
      label: 'Appearance',
      fields: [
        'backgroundColor',
        'blog',
        'shadow',
        'buttonText',
        'buttonTextClose'
      ]
    },
    {
      name: 'options',
      label: 'Options',
      fields: [
        'ajaxAppend',
        'withTags',
        '_ordering',
      ]
    }
  ]
};
