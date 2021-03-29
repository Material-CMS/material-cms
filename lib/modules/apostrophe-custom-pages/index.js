module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'nav',
        type: 'select',
        label: 'Navigation',
        help: 'Choose navigation, ether default, dropdown, manual or hide',
        choices: [
          {
            label: 'Default',
            value: 'default',
            showFields: [
              '_logo',
              '_navBackgroundImage',
              'gradientColorTop',
              'gradientColorBottom',
              'navShadow',
              'links'
            ],
            def: true
          },
          {
            label: 'Dropdown',
            value: 'dropdown',
            showFields: [
              '_logo',
              '_navBackgroundImage',
              'gradientColorTop',
              'gradientColorBottom',
              'navShadow',
              'links'
            ]
          },
          {
            label: 'Manual',
            value: 'manual',
            showFields: [
              '_logo',
              '_navBackgroundImage',
              'gradientColorTop',
              'gradientColorBottom',
              'navShadow',
              'links',
              'navArray'
            ]
          },
          {
            label: 'Hide',
            value: false
          }
        ]
      },
      {
        name: '_logo',
        type: 'joinByOne',
        withType: 'apostrophe-image',
        label: 'Logo',
        help: 'Choose a logo for your website (override by page specific logo)',
        filters: {
          projection: {
            attachment: true,
            description: true,
            title: true
          }
        }
      },
      {
        name: 'hideContactButton',
        type: 'boolean',
        label: 'Activate Page Contact Button',
        help: 'Hide the contact button which can be activated in global for this specific page (default: No)',
        def: false
      },
      {
        name: 'shadow',
        type: 'boolean',
        label: 'Shadow for Cards',
        help: 'Choose shadow for cards on page (default: Yes)',
        def: true
      },
      {
        name: '_navBackgroundImage',
        type: 'joinByOne',
        withType: 'apostrophe-image',
        label: 'Navigation Background Image',
        help: 'Choose a background image for navigation (nav will activate pushpin feature)',
        filters: {
          projection: {
            attachment: true,
            description: true,
            title: true
          }
        }
      },
      {
        name: 'gradientColorTop',
        label: 'Background Gradient Color Top',
        type: 'color',
        help: 'Choose the top color for navigation background gradient overlay'
      },
      {
        name: 'gradientColorBottom',
        label: 'Background Gradient Color Bottom',
        type: 'color',
        help: 'Choose the bottom color for navigation background gradient overlay'
      },
      {
        name: 'navShadow',
        type: 'boolean',
        label: 'Navigation Shadow',
        help: 'Choose shadow for navigation (default: Yes)',
        def: false
      },
      {
        name: 'links',
        label: 'Links',
        type: 'array',
        help: 'Choose external links which will be shown in navigation (you can choose material icons too)',
        titleField: 'name',
        schema: [
          {
            name: 'name',
            type: 'string',
            label: 'Name'
          },
          {
            type: 'url',
            name: 'url',
            label: 'Links to other Pages',
          },
          {
            name: 'icon',
            type: 'string',
            label: 'Icon'
          }
        ]
      },
      {
        name: 'navArray',
        label: 'Array of Links to Subpages',
        type: 'array',
        help: 'Add an array of links to subpages which can cointain anchors to on the same subpages as well',
        titleField: 'name',
        schema: [
          {
            name: 'name',
            type: 'string',
            label: 'Name'
          },
          {
            type: 'url',
            name: 'url',
            label: 'Main Links',
          },
          {
            name: 'navArrayDropdown',
            label: 'Page Anchors',
            type: 'array',
            help: 'Choose dropdown links for anchor navigation on page',
            titleField: 'nameDropdown',
            schema: [
              {
                name: 'nameDropdown',
                type: 'string',
                label: 'Name'
              },
              {
                type: 'url',
                name: 'url',
                label: 'Dropdown Links',
              }
            ]
          }
        ]
      },
    ].concat(options.addFields || []);

    options.arrangeFields = [
      {
        name: 'navigation',
        label: 'Navigation',
        fields: ['nav', 'navArray',  '_logo', '_navBackgroundImage', 'gradientColorTop', 'gradientColorBottom', 'navShadow', 'links']
      },
      {
        name: 'options',
        label: 'Options',
        fields: ['hideContactButton', 'shadow']
      }
    ].concat(options.arrangeFields || []);
  }
};
