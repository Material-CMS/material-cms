// Add new CSS propertys for apostrophe palette here
module.exports = {
  paletteFields: [
    {
      name: 'borderRadius',
      label: 'Round Corners',
      type: 'range',
      selector: [
        '.radius',
        '.image-radius'
      ],
      property: 'border-radius',
      min: 0,
      max: 50,
      step: 1,
      unit: 'px'
    },
    {
      name: 'backgroundColor',
      label: 'Background color of the website',
      type: 'color',
      selector: [
        'body',
        '.bg-color'
      ],
      property: 'background-color',
    },
    {
      name: 'mainColor',
      label: 'Main Color',
      type: 'color',
      selector: [
        '.main-color',
        '.collapsible',
        '.collapsible-body',
        '.collapsible-header',
        '.collection-item.avatar',
        '.expand-header',
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
        '.apos-rich-text'
      ],
      property: [
        'color',
        'fill'
      ]
    },
    {
      name: 'textBottomMargin',
      label: 'Text Bottom Margin',
      type: 'range',
      selector: '.card .card-content p.flow-text',
      property: 'margin-bottom',
      min: 0,
      max: 4,
      step: 0.1,
      unit: 'rem'
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
      name: 'btnColor',
      label: 'Button Color',
      type: 'color',
      selector: '.btn-color',
      property: 'background-color',
      valueTemplate: '%VALUE% !important'
    },
    {
      name: 'btnBorderRadius',
      label: 'Button Rounding',
      type: 'range',
      selector: [
        '.btn-radius',
        'button[type="submit"]'
      ],
      property: 'border-radius',
      min: 0,
      max: 50,
      step: 1,
      unit: 'px',
      valueTemplate: '%VALUE% !important'
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
