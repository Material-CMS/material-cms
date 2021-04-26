module.exports = {
  extend: 'apostrophe-widgets',
  name: 'button',
  label: 'Contact Action Button',
  addFields: [
    {
      name: 'tooltips',
      label: 'Show Tooltips',
      type: 'boolean',
      help: 'Show tooltips right to buttons. (default: Yes)',
      def: true
    },
    {
      name: 'hoverEnabled',
      label: 'Enable Button Hover',
      type: 'boolean',
      help: 'Show contact button elements on hover instead on click. (default: No)',
      def: false
    },
    {
      name: 'buttonColor',
      label: 'Button Background Color',
      type: 'color',
      help: 'Choose background color of button to override global button color.'
    },
    {
      name: 'iconColor',
      label: 'Icon & Tooltip Color',
      type: 'color',
      help: 'Choose icon and tooltip color to override global accent and text color.'
    }
  ],
  construct: function(self, options) {
    // Add lean and always scripts
    if (self.apos.assets.options.lean) {
      if (self.options.player) {
        self.pushAsset('script', 'lean', { when: 'lean' });
      }
    } else {
      self.pushAsset('script', 'always', { when: 'always' });
    }
  }
};
