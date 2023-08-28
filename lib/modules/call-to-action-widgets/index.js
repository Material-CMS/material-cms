module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Call To Action',
  addFields: [
    {
			name: 'callToActionLink',
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
      name: 'align',
      type: 'select',
      label: 'Button Align',
      help: 'Choose button align. (left, center, right)',
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
      name: 'color',
      label: 'Button Color',
      type: 'color',
      help: 'Choose a color for call to action button to override accent color.'
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'string',
      help: 'Add an icon prefix to button (name it exactly like in material icon set e.g. account_circle)',
    }
  ],
  construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
