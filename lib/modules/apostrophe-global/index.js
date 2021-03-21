module.exports = {
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Add a title of your website (override by page specific title)'
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
      def: false
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
      name: 'links',
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
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'string',
      help: 'Add your contact number'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'string',
      help: 'Add your contact email'
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'url',
      help: 'Add your Facebook account'
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'url',
      help: 'Add your Instagram account'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'url',
      help: 'Add your LinkedIn account'
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'url',
      help: 'Add your Twitter account'
    },
    {
      name: 'buttonOn',
      type: 'boolean',
      label: 'Contact Info Button On',
      help: 'Thurn On button on the lower right corner with your display your contact Info',
      def: false
    },
    {
      name: 'privacy',
      label: 'Privacy Statement',
      help: 'Add your data privacy and protection disclamer here',
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
      name: 'footerPrivacy',
      label: 'Footer Privacy Button',
      type: 'string',
      help: 'Rename footer privacy button to something other than "Privacy"'
    },
    {
      name: 'legal',
      label: 'Legal Info',
      help: 'Add imprint or legal disclamer here',
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
      name: 'footerLegal',
      label: 'Footer Legal Button',
      type: 'string',
      help: 'Rename footer legal button to something other than "Legal"'
    },
    {
      name: 'creation_date',
      label: 'Creation Date',
      type: 'date',
      help: 'Add the creation date of your webapp',
      pikadayOptions: {
        format: 'YYYY'
      }
    },
    {
      name: 'copyright',
      label: 'Copyright Info',
      type: 'string',
      help: 'Add your company name'
    },
    {
      name: 'navTextColor',
      label: 'Nav Text Color',
      type: 'color',
      help: 'Navigation uses accent color by default, override here'
    },
    {
      name: 'additionalStyles',
      label: 'Additional Styles',
      type: 'string',
      help: 'Add additional css styles to your site ( MAY BREAK DESIGN SO TAKE CARE! )',
      textarea: true
    }
  ],
  // Fields Arrangement
  arrangeFields:[
    {
      name: 'about',
      label: 'About',
      fields: ['buttonOn', 'phone', 'email', 'facebook', 'instagram', 'linkedin', 'twitter']
    },
    {
      name: 'navigation',
      label: 'Navigation',
      fields: ['_logo', '_navBackgroundImage', 'gradientColorTop', 'gradientColorBottom', 'navShadow', 'navGoBack', 'links']
    },
    {
      name: 'footer',
      label: 'Footer',
      fields: ['copyright', 'creation_date', 'footerLegal', 'footerPrivacy']
    },
    {
      name: 'disclaimers',
      label: 'Disclaimers',
      fields: ['privacy', 'legal']
    },
    {
      name: 'styles',
      label: 'Styles',
      fields: ['navTextColor', 'additionalStyles']
    },
  ]
};
