module.exports = {
  // Add Fields to Global
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Add a title of your website (override by page specific title)'
    },
    // Nav Fields
    {
      name: 'nav',
      type: 'select',
      label: 'Navigation',
      help: 'Choose navigation, ether default, dropdown, manual or hide.',
      choices: [
        {
          label: 'Default',
          value: 'default',
          def: true
        },
        {
          label: 'Manual',
          value: 'manual'
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
      def: true
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
      name: 'navGoBack',
      label: 'Go Back Text',
      type: 'string',
      help: 'Rename navigation go back to something other than "Go Back"'
    },
    {
      name: 'linksArray',
      label: 'Links',
      type: 'array',
      help: 'Choose External Links for Main Menu',
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
          label: 'Links to Other Pages',
        },
        {
          name: 'icon',
          type: 'string',
          label: 'Icon'
        },
      ]
    },
    // About Fields
    {
      name: 'websiteTitle',
      label: 'Website Title',
      type: 'string',
      help: 'Add a global homepage title which displays in navigation and footer on all pages, (If empty page home title is taken).'
    },
    {
      name: 'street',
      label: 'Street',
      type: 'string',
      help: 'Add an Street which will be shown in footer.',
    },
    {
      name: 'zip',
      label: 'Zip',
      type: 'string',
      help: 'Add an zip adress which will be shown in footer.',
    },
    {
      name: 'city',
      label: 'City',
      type: 'string',
      help: 'Add an Street which will be shown in footer.',
    },
    {
      name: 'country',
      label: 'Country',
      type: 'string',
      help: 'Add an Country which will be shown in footer.',
    },
    {
      name: 'copyright',
      label: 'Copyright Info',
      type: 'string',
      help: 'Add your company name which will be shown in footer.'
    },
    {
      name: 'creationDate',
      label: 'Creation Date',
      type: 'date',
      help: 'Add the creation date of your website which will be shown in footer.',
      pikadayOptions: {
        format: 'YYYY'
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'string',
      help: 'Add your contact number.'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'string',
      help: 'Add your contact email.'
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'url',
      help: 'Add your Facebook account.'
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'url',
      help: 'Add your Instagram account.'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'url',
      help: 'Add your LinkedIn account.'
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'url',
      help: 'Add your Twitter account.'
    },
    {
      name: 'showContactButton',
      type: 'boolean',
      label: 'Show Contact Info Button',
      help: 'Activate the contact button on the lower right corner which shows social phone, email and social media fields (default: No).',
      def: false
    },
    // Footer Fields
    {
      name: 'bigFooter',
      label: 'Big Footer',
      type: 'boolean',
      help: 'Show page navigation and about fields for all footers. (default: Yes)',
      def: true
    },
    {
      name: 'aboutTitle',
      label: 'About Fields Title',
      type: 'string',
      help: 'Rename about fields for all footers to something more personal than "About".'
    },
    {
      name: 'footerPrivacy',
      label: 'Footer Privacy Button',
      type: 'string',
      help: 'Rename privacy button for all footers to something other than "Privacy".'
    },
    {
      name: 'footerLegal',
      label: 'Footer Legal Button',
      type: 'string',
      help: 'Rename legal button for all footers to something other than "Legal".'
    },
    {
      name: 'privacy',
      label: 'Privacy Statement',
      help: 'Add your data privacy and protection disclamer here (will be shown in all footers).',
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
            controls: {
              movable: false,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
           }
         }
       }
    },
    {
      name: 'legal',
      label: 'Legal Info',
      help: 'Add imprint or legal disclamer here (will be shown in all footers).',
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
            controls: {
              movable: false,
              cloneable: false,
              removable: true,
              position: 'top-right'
            }
           }
         }
       }
    },
    // Styles Fields
    {
      name: 'navTextColor',
      label: 'Nav Text Color',
      type: 'color',
      help: 'Override text color for all navigtaions.'
    },
    {
      name: 'additionalStyles',
      label: 'Additional Styles',
      type: 'string',
      help: 'Add additional css styles to your site.',
      textarea: true
    }
  ],
  // Fields Arrangement
  arrangeFields:[
    {
      name: 'about',
      label: 'About',
      fields: [
        'websiteTitle',
        'street',
        'zip',
        'city',
        'country',
        'copyright',
        'creationDate',
        'phone',
        'email'
      ]
    },
    {
      name: 'social',
      label: 'Social',
      fields: [
        'facebook',
        'instagram',
        'linkedin',
        'twitter',
        'showContactButton'
      ]
    },
    {
      name: 'navigation',
      label: 'Navigation',
      fields: [
        'nav',
        '_logo',
        '_navBackgroundImage',
        'gradientColorTop',
        'gradientColorBottom',
        'navShadow',
        'navGoBack',
        'linksArray',
        'navTextColor'
      ]
    },
    {
      name: 'footer',
      label: 'Footer',
      fields: [
        'bigFooter',
        'aboutTitle',
        'footerPrivacy',
        'footerLegal'
      ]
    },
    {
      name: 'disclaimers',
      label: 'Disclaimers',
      fields: [
        'privacy',
        'legal'
      ]
    },
    {
      name: 'styles',
      label: 'Styles',
      fields: [
        'additionalStyles'
      ]
    },
  ]
};
