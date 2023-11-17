module.exports = {
	extend: 'apostrophe-widgets',
	name: 'grid',
	label: 'Grid Widget',
	addFields: [
		{
			name: 'gridItems',
			label: 'Grid Items',
			type: 'array',
			help: 'Add grid items that you can fill with widgets on the main page.',
			schema: [
				{
					name: 'item',
					type: 'area',
					label: 'Grid Item',
					options: {
						widgets: {
							'card': {
								aspectRatio: [1,1],
								size: 'two-thirds',
								sizesAttr: '(max-width:600px) 50vw, 25vw',
								controls: {
									cloneable: false,
									removable: true,
									position: 'top-right'
								}
							},
							'card-link': {
								aspectRatio: [1,1],
								size: 'two-thirds',
								sizesAttr: '(max-width:400px) 30vw, 25vw',
								focalPoint: true,
								noHeight: true,
								controls: {
									cloneable: false,
									removable: true,
									movable: false,
									position: 'top-right'
								}
							},
							'texts': {
								controls: {
									cloneable: false,
									removable: true,
									position: 'top-right'
								}
							},
							'call-to-action': {
								controls: {
									cloneable: false,
									removable: true,
									position: 'top-right'
								}
							}
						}
					}
				}
			]
		},
		{
			name: 'gridTemplateColumns',
			label: 'Grid Template Columns',
			type: 'string',
			help: 'You can define the grid template columns here.'
		}
  ]
};
