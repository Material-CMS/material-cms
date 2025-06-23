module.exports = {
  addFields: [
    // About Fields
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      help: 'Add a title of your website (override by page specific title)'
    },
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
      type: 'singleton',
      label: 'Facebook',
      help: 'Add a link to an Facebook profile.',
      widgetType: 'link',
      options: {
        limit: 1,
        addLabel: 'Add Facebook Link',
        editLabel: 'Change Facebook Link',
        controls: {
          movable: false,
        }
      }
    },
    {
      name: 'instagram',
      type: 'singleton',
      label: 'Instagram',
      help: 'Add a link to an Instagram profile.',
      widgetType: 'link',
      options: {
        limit: 1,
        addLabel: 'Add Instagram Link',
        editLabel: 'Change Instagram Link',
        controls: {
          movable: false,
        }
      }
    },
    {
      name: 'linkedin',
      type: 'singleton',
      label: 'LinkedIn',
      help: 'Add a link to an LinkedIn profile.',
      widgetType: 'link',
      options: {
        limit: 1,
        addLabel: 'Add LinkedIn Link',
        editLabel: 'Change LinkedIn Link',
        controls: {
          movable: false,
        }
      }
    },
    {
      name: 'twitter',
      type: 'singleton',
      label: 'Twitter',
      help: 'Add a link to an Twitter profile.',
      widgetType: 'link',
      options: {
        limit: 1,
        addLabel: 'Add Twitter Link',
        editLabel: 'Change Twitter Link',
        controls: {
          movable: false,
        }
      },
    },
    // Disclaimers
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
              'Link',
              'Unlink',
              'Table'
            ],
						styles: [
							{
								name: 'Centered',
								element: 'p',
								styles: {
									'text-align': 'center'
								}
							},
							{
								name: 'H4',
								element: 'h4',
								attributes: {
									class: 'accent-color'
								}
							},
							{
								name: 'H4 Centered',
								element: 'h4',
								attributes: {
									class: 'accent-color'
								},
								styles: {
									'text-align': 'center'
								}
							}
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
              'Link',
              'Unlink',
              'Table'
            ],
						styles: [
							{
								name: 'Centered',
								element: 'p',
								styles: {
									'text-align': 'center'
								}
							},
							{
								name: 'H4',
								element: 'h4',
								attributes: {
									class: 'accent-color'
								}
							},
							{
								name: 'H4 Centered',
								element: 'h4',
								attributes: {
									class: 'accent-color'
								},
								styles: {
									'text-align': 'center'
								}
							}
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
    // Nav Fields
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
      name: 'navTextColor',
      label: 'Navigation Text Color',
      type: 'color',
      help: 'Choose color to override global text color for navigation.'
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
      name: 'navDouble',
      type: 'boolean',
      label: 'Navigation Double Width',
      help: 'Activate double width with collapse feature for nav. (Default: No)',
      def: false
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
      name: 'footerColor',
      label: 'Footer Color',
      type: 'color',
      help: 'Footer uses navigation color by default, override here.'
    },
    {
      name: 'footerTextColor',
      label: 'Footer Text Color',
      type: 'color',
      help: 'Footer text uses text color by default, override here.'
    },
    // Add-Ons Fields
    {
      name: 'floatingActionButton',
      label: 'Contact Action Button',
      type: 'area',
      htmlHelp: 'Add a contact button on the lower right corner, which shows about fields.' + '<br>' +
      '(Can be hidden for every page in page settings)',
      options: {
        limit: 1,
        widgets: {
          'button': {
            controls: {
              cloneable: false,
              movable: false
            }
          }
        }
      }
    },
    {
      name: 'additionalStyles',
      label: 'Additional Styles',
      type: 'string',
      help: 'Add additional css styles to your site which will be loaded in the header.',
      textarea: true
    },
    {
      name: 'font',
      type: 'select',
      label: 'Choose Font',
      help: 'Choose a font for all texts. (Headers and Titles can be overwritten by additional font above)',
      choices: [
        {
          label: 'Arial',
          value: 'Arial, sans-serif',
          def: true
        },
        {
          label: 'Verdana',
          value: 'Verdana, Arial, sans-serif'
        },
        {
          label: 'Helvetica',
          value: 'Helvetica, sans-serif'
        },
        {
          label: 'Tahoma',
          value: 'Tahoma, sans-serif'
        },
        {
          label: 'Trebuchet MS',
          value: '"Trebuchet MS", sans-serif'
        },
        {
          label: 'Calibri',
          value: 'Calibri, sans-serif'
        },
        {
          label: 'Impact',
          value: 'Impact, sans-serif'
        },
        {
          label: 'Courier New',
          value: '"Courier New", sans-serif'
        },
        {
          label: 'Candara',
          value: 'Candara, sans-serif'
        },
        {
          label: 'Geneva',
          value: 'Geneva, sans-serif'
        },
        {
          label: 'Century Gothic',
          value: '"Century Gothic", sans-serif'
        },
        {
          label: 'Times New Roman',
          value: '"Times New Roman", serif'
        },
        {
          label: 'Georgia',
          value: 'Georgia, serif'
        },
        {
          label: 'Optima',
          value: 'Optima, serif'
        },
        {
          label: 'Didot',
          value: 'Didot, serif'
        }
      ]
    },
    {
      name: 'additionalFonts',
      label: 'Additional Fonts',
      type: 'url',
      help: 'Add additional fonts to your site which you can activate in options of desired elements.',
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
        'email',
        'facebook',
        'instagram',
        'linkedin',
        'twitter',
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
      name: 'navigation',
      label: 'Navigation',
      fields: [
        'nav',
        '_logo',
        '_navBackgroundImage',
        'navTextColor',
        'gradientColorTop',
        'gradientColorBottom',
        'navShadow',
        'navGoBack',
        'linksArray'
      ]
    },
    {
      name: 'footer',
      label: 'Footer',
      fields: [
        'bigFooter',
        'aboutTitle',
        'footerPrivacy',
        'footerLegal',
        'footerColor',
        'footerTextColor'
      ]
    },
    {
      name: 'fonts',
      label: 'Fonts',
      fields: [
        'font',
        'additionalFonts'
      ]
    },
    {
      name: 'addons',
      label: 'Add-Ons',
      fields: [
        'floatingActionButton',
        'additionalStyles'
      ]
    }
  ]
};
