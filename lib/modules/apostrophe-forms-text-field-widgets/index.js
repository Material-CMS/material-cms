module.exports = {
  extend: 'apostrophe-forms-base-field-widgets',
  label: 'Text Input',
  addFields: [
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'string',
      help: 'Text to display in the field before someone uses it (e.g., to provide additional directions).'
    },
    {
      name: 'inputType',
      label: 'Input Type',
      type: 'select',
      help: 'If you are requesting certain formatted information (e.g., email, url, phone number), select the relevant input type here. If not, use "Text".',
      choices: [
        {
          label: 'Text',
          value: 'text'
        },
        {
          label: 'Email',
          value: 'email'
        },
        {
          label: 'Telephone',
          value: 'tel'
        },
        {
          label: 'URL',
          value: 'url'
        },
        {
          label: 'Date',
          value: 'date'
        },
        {
          label: 'Password',
          value: 'password'
        }
      ],
      def: 'text'
    },
    {
      name: 'icon',
      type: 'string',
      label: 'Icon Prefix',
      help: 'Add an icon prefix to field (name it exactly like in material icon set e.g. account_circle)',
    }
  ],
  construct: function (self, options) {
    options.arrangeFields = options.arrangeFields.map(group => {
      if (group.name === 'settings') {
        group.fields.push('placeholder');
        group.fields.push('inputType');
        group.fields.push('icon');
      }

      return group;
    });

    self.sanitizeFormField = function (req, form, widget, input, output) {
      output[widget.fieldName] = self.apos.launder.string(input[widget.fieldName]);
    };
  }
};
