module.exports = {
	extend: 'apostrophe-pieces',
	name: 'text',
	label: 'Text',
	pluralLabel: 'Texts',
	slugPrefix: 'text-',
	contextualOnly: false,
	seo: false,
	openGraph: false,
	addFields: [
		{
			name: 'title',
			label: 'Title',
			type: 'string',
			help: 'This is the minimum, use only a title for a header.',
			required: true
    },
		{
			name: 'titleColor',
			label: 'Title Color',
			type: 'color',
			help: 'Choose a color to override accent color.'
    },
		{
			name: 'titleAdditionalFont',
			label: 'Title Additional Font',
			type: 'boolean',
			help: 'Use additional font for title. (Add one in global before)'
		},
		{
			name: 'titleShow',
			type: 'select',
			label: 'Show Title',
			help: 'Choose to show text title. (default: Yes)',
			choices: [
				{
					label: 'Yes',
					value: true,
					def: true,
					showFields: [
						'titleAlign'
					]
        },
				{
					label: 'No',
					value: false
        }
      ]
    },
		{
      name: 'titleAlign',
      type: 'select',
      label: 'Header Text Align',
      help: 'Choose header text align. (left, center, right)',
      choices: [
        {
          label: 'Left',
          value: 'left',
          def: true
        },
        {
          label: 'Center',
          value: 'center'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ]
    },
		{
			name: 'description',
			type: 'area',
			label: 'Teaser Text',
			help: 'Add the main teaser text which will be shown always.',
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
								name: 'Justified',
								element: 'p',
								styles: {
									'text-align': 'justify'
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
					},
					'events': {
						addLabel: 'Events',
						controls: {
							movable: true,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					},
					'call-to-action': {
						addLabel: 'Call To Action Button',
						controls: {
							movable: true,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					},
					'card': {
						addLabel: 'Image',
						editLabel: 'Cange Image',
						size: 'one-half',
						limit: 1,
						noHeight: true,
						sizesAttr: '(max-width:600px) 50vw, 40vw',
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
			label: 'Long Text',
			htmlHelp: 'Add longer text.' + '<br />' +
				'(Will be shown when user clicks on "more" or "read" button, depending on blog option.)',
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
								name: 'Justified',
								element: 'p',
								styles: {
									'text-align': 'justify'
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
					},
					'events': {
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
							movable: true,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					},
					'apostrophe-video': {
						controls: {
							movable: false,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					},
					'card': {
						addLabel: 'Image',
						editLabel: 'Cange Image',
						size: 'one-half',
						limit: 1,
						noHeight: true,
						sizesAttr: '(max-width:600px) 50vw, 40vw',
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
			name: 'backColor',
			label: 'Background Color',
			type: 'color',
			help: 'Choose a color to override main color.'
    },
		{
			name: 'buttonText',
			type: 'string',
			label: 'Button Text',
			help: 'Change text of more or blog button to something more personal than "more" or "read".'
    },
		{
			name: 'buttonTextClose',
			type: 'string',
			label: 'Button Text Close',
			help: 'Change text of more button to something more personal than "close".'
		},
		{
			name: 'linkArea',
			label: 'Link',
			type: 'area',
			help: 'Coose "Link to Anywhere" for external pages or "Link to a Page" to link subpages dynamicly.',
			options: {
				limit: 1,
				widgets: {
					'link': {
						controls: {
							movable: true,
							cloneable: false,
							removable: true,
							position: 'top-right'
						}
					},
					'link-page': {
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
            'sideImage',
            'sideImageLeft'
          ]
        },
				{
					label: 'Yes',
					value: true,
					showFields: [
            'topImage',
						'buttonTextClose'
          ]
        }
      ]
    },
		{
			name: 'sideImage',
			type: 'area',
			label: 'Side Image',
			help: 'Add an image to the side of text.',
			options: {
				limit: 1,
				widgets: {
					'card': {
						aspectRatio: [2, 4],
						focalPoint: true,
						noHeight: true,
						limit: 1,
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
			name: 'sideImageLeft',
			type: 'select',
			label: 'Side Image Orientation',
			help: 'Select whether the image is displayed on the left or on the right.',
			choices: [
				{
					label: 'Right',
					value: false,
					def: true
         },
				{
					label: 'Left',
					value: true
         }
       ]
     },
		{
			name: 'topImage',
			label: 'Top Image',
			type: 'area',
			help: 'Add top image for blog teaser.',
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
						aspectRatio: [3, 1],
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
	// Fields Arrangement
	arrangeFields: [
		{
			name: 'basics',
			label: 'Basics',
			fields: [
        'title',
        'description',
        'text',
        'blog'
      ]
    },
		{
			name: 'images',
			label: 'Images',
			fields: [
        'topImage',
        'sideImage',
        'sideImageLeft'
      ]
    },
		{
			name: 'colors',
			label: 'Colors',
			fields: [
        'titleColor',
        'backColor'
      ]
    },
		{
			name: 'options',
			label: 'Options',
			fields: [
        'titleShow',
        'titleAlign',
				'titleAdditionalFont',
        'buttonText',
				'buttonTextClose',
        'linkArea'
      ]
    },
		{
			name: 'info',
			label: 'Info',
			fields: [
        'slug',
        'tags',
        'published'
      ]
    }
  ]
};
