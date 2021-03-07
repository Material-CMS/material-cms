// Add new CSS propertys for apostrophe palette here
module.exports = {
  paletteFields: [
    {
      name: 'backgroundColor',
      label: 'Background color of the website',
      type: 'color',
      selector: 'body',
      property: 'background-color',
    },
    {
      name: 'mainColor',
      label: 'Main Color',
      type: 'color',
      selector: [
        '.content',
        '.card',
        '.card-content',
        '.card-reveal',
        '.collapsible',
        '.collapsible-body',
        '.collapsible-header',
        '.collection-item.avatar',
        '.swiper-container'
      ],
      property: 'background-color'
    },
    {
      name: 'textColor',
      label: 'Text Color',
      type: 'color',
      selector: [
        '.flow-text',
        '.apos-rich-text'
      ],
      property: 'color'
    },
    {
      name: 'navColor',
      label: 'Nav Color',
      type: 'color',
      selector: 'nav',
      property: 'background-color'
    },
    {
      name: 'accentColor',
      label: 'Accent Color',
      type: 'color',
      selector: '.accent-color',
      property: 'color'
    },
    {
      name: 'btnColor',
      label: 'Button Color',
      type: 'color',
      selector: '.btn-color',
      property: 'background-color'
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
    }
  ]
};
