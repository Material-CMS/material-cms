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
					help: 'Add a swiper element.',
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
						 'card-link': {
							 aspectRatio: [ 2, 1 ],
							 focalPoint: true,
							 noHeight: true,
							 limit: 1,
							 sizesAttr: '(max-width:600px) 50vw, 40vw',
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
		},
		{
			name: 'shadow',
			type: 'boolean',
			label: 'Element Shadow',
			help: 'Choose shadow for element. (default: Yes)',
			def: true
		},
		{
			name: 'effect',
			type: 'select',
			label: 'Select Effect',
			help: 'Choose effect for swiper. (default: No)',
			choices: [
				{
					label: 'Slide',
					value: 'slide',
					def: true
				},
				{
					label: 'Fade',
					value: 'fade'
				},
				{
					label: 'Coverflow',
					value: 'coverflow'
				},
				{
					label: 'Flip',
					value: 'flip'
				},
				{
					label: 'Cube',
					value: 'cube'
				}
			]
		},
		{
			name: 'overflow',
			type: 'select',
			label: 'Overflow',
			help: 'Creates a swiper with off canvas elements. (default: No)',
			choices: [
				{
					label: 'No',
					value: false,
					showFields: [
						'slidesPerView'
					],
					def: true
				},
				{
					label: 'Yes',
					value: true,
					showFields: [
						'slidesWidth'
					]
				}
			]
		},
		{
			name: 'slidesPerView',
			label: 'Slides Per View',
			type: 'range',
			help: 'Choose how much slides you want to show on the view. (default: 1)',
			min: 1,
			max: 4,
			step: 1,
			def: 1
		},
		{
			name: 'slidesWidth',
			label: 'Slides Width',
			type: 'range',
			help: 'Choose width of your slides. (default: 60)',
			min: 10,
			max: 90,
			step: 10,
			def: 60
		},
		{
			name: 'loop',
			label: 'Loop Swiper',
			type: 'boolean',
			help: 'Activate loop for swiper. (default: No)',
			def: false
		},
		{
			name: 'autoplay',
			type: 'select',
			label: 'Activate Autoplay',
			help: 'Activate autoplay for swiper. (default: No)',
			choices: [
				{
					label: 'Yes',
					value: true,
					showFields: [ 'delay', 'disableOnInteraction']
				},
				{
					label: 'No',
					value: false,
					def: true
				}
			]
		},
		{
			name: 'disableOnInteraction',
			label: 'Autoplay Disable on Interactiom',
			type: 'boolean',
			help: 'Stop swiper on interaction. (default: No)',
			def: false
		},
		{
			name: 'speed',
			label: 'Swipe Speed',
			type: 'range',
			help: 'Choose speed of transition between swpipes. (format: ms, default: 300)',
			min: 100,
			max: 2000,
			step: 100,
			def: 300
		},
		{
			name: 'delay',
			label: 'Autoplay Delay',
			type: 'range',
			help: 'Choose delay before swiper starts. (format: ms, default: 3000)',
			min: 1000,
			max: 10000,
			step: 1000,
			def: 3000
		},
		{
			name: 'spaceBetween',
			label: 'Space Between Sliders',
			type: 'range',
			help: 'Choose the space between your sliders. (default: 20)',
			min: 0,
			max: 100,
			step: 10,
			def: 20
		},
		{
			name: 'navigation',
			type: 'boolean',
			label: 'Navigation Arrows',
			help: 'Show navigation arrows. (default: Yes)',
			def: true
		},
		{
			name: 'pagination',
			type: 'boolean',
			label: 'Pagination Bullets',
			help: 'Show pagination bullets. (default: No)',
			def: true
		},
		{
			name: 'scrollbar',
			type: 'boolean',
			label: 'Scrollbar',
			help: 'Show horizontal scrollbar. (default: No)',
			def: true
		},
	],
	//Fields Arrangement
	arrangeFields: [
		{
			name: 'swipers',
			label: 'Swipers',
			fields: [
				'swipers',
				'navigation',
				'pagination',
				'scrollbar',
				'slidesPerView'
			]
		},
		{
			name: 'options',
			label: 'Options',
			fields: [
				'shadow',
				'loop',
				'autoplay',
				'disableOnInteraction',
				'speed',
				'delay',
				'effect',
				'spaceBetween',
				'overflow',
				'slidesWidth',
			]
		}
	],
	construct: function(self, options) {
    self.pushAsset('script', 'widget', { when: 'lean' });
  }
};
