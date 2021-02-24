module.exports = {
	extend: 'apostrophe-widgets',
	name: 'swiper',
	label: 'Swiper Widget',
	addFields: [
		{
			name: 'swipers',
			label: 'Swiper',
			type: 'array',
			help: 'Choose a Swiper',
			schema: [
				{
					name: 'swiper',
					type: 'area',
					label: 'Swiper Element',
					help: 'Add a swiper element',
					options: {
					limit: 1,
					widgets: {
						'card': {
							 aspectRatio: [ 2, 1 ],
							 focalPoint: true,
							 noHeight: true,
							 limit: 1,
							 controls: {
								 cloneable: false,
								 removable: true,
								 position: 'top-right'
							 }
						 },
						 'texts': {
								limit: 1,
								controls: {
									cloneable: false,
									removable: true,
									position: 'top-right'
								}
							},
							'video': {
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
			]
		}
	],
};
