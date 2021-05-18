// Add new CSS propertys for apostrophe palette here
module.exports = {
  paletteFields: [
    {
      name: 'backgroundColor',
      label: 'Background color of the website',
      type: 'color',
      selector: [
        'body'
      ],
      property: 'background-color',
    },
    {
      name: 'mainColor',
      label: 'Main Color',
      type: 'color',
      selector: [
        '.card',
        '.card-content',
        '.card-reveal',
        '.collapsible',
        '.collapsible-body',
        '.collapsible-header',
        '.collection-item.avatar',
        '.swiper-container',
        '.expand-body',
        '.expand-cover'
      ],
      property: 'background-color'
    },
    {
      name: 'textColor',
      label: 'Text Color',
      type: 'color',
      selector: [
        '.text-color',
        '.flow-text',
        '.apos-rich-text'
      ],
      property: [
        'color',
        'fill'
      ]
    },
    {
      name: 'navColor',
      label: 'Nav Color',
      type: 'color',
      selector: '.nav-color',
      property: 'background-color',
      valueTemplate: '%VALUE% !important'
    },
    {
      name: 'accentColor',
      label: 'Accent Color',
      type: 'color',
      selector: '.accent-color',
      property: [
        'color',
        'fill'
      ],
    },
    {
      name: 'linkColor',
      label: 'Link Color',
      type: 'color',
      selector: [
        '.link-color'
      ],
      property: [
        'color',
        'fill'
      ]
    },
    {
      name: 'btnColor',
      label: 'Button Color',
      type: 'color',
      selector: '.btn-color',
      property: 'background-color',
      valueTemplate: '%VALUE% !important'
    },
    {
      name: 'borderRadius',
      label: 'Round Corners',
      type: 'range',
      selector: [
        '.radius',
        '.btn-radius'
      ],
      property: 'border-radius',
      min: 0,
      max: 50,
      step: 1,
      unit: 'px'
    },
    {
      name: 'headerBottomMargin',
      label: 'Header Bottom Margin',
      type: 'range',
      selector: '.section-header',
      property: 'margin-bottom',
      min: 0,
      max: 10,
      step: 1,
      unit: 'rem'
    }
  ]
};
