module.exports = {
  extend: 'apostrophe-pieces',
  name: 'text',
  label: 'Text',
  pluralLabel: 'Texts',
  contextualOnly: false,
  addFields: [
    // Main Fields
    {
      name: 'title',
      label: 'Title',
      type: 'string'
    },
    {
      name: 'text',
      label: 'Description',
      type: 'string',
      textarea: true
    },
    // Tab Fields
    {
      name: 'tab1',
      label: 'Text',
      type: 'string'
    },
    {
      name: 'tab2',
      label: 'Text',
      type: 'string'
    },
    {
      name: 'tab3',
      label: 'Text',
      type: 'string'
    },
    // Text Fields
    {
      name: 'text1',
      label: 'Description',
      type: 'string',
      textarea: true
    },
    {
      name: 'text2',
      label: 'Description',
      type: 'string',
      textarea: true
    },
    {
      name: 'text3',
      label: 'Description',
      type: 'string',
      textarea: true
    },
    // Icon Fields
    {
      name: 'icon1',
      label: 'Icon',
      type: 'string'
    },
    {
      name: 'icon2',
      label: 'Icon',
      type: 'string'
    },
    {
      name: 'icon3',
      label: 'Icon',
      type: 'string'
    },
    // Coices Fields
    {
      type: 'select',
      name: 'tab1_choice',
      label: 'Do you want text or icon?',
      choices: [
        {
          label: 'Text',
          value: 'tab1_text',
          showFields: [
            'tab1',
          ]
        },
        {
          label: 'Icon',
          value: 'tab1_icon',
          showFields: [
            'icon1',
          ]
        }
      ]
    },
    {
      type: 'select',
      name: 'tab2_choice',
      label: 'Do you want text or icon?',
      choices: [
        {
          label: 'Text',
          value: 'tab2_text',
          showFields: [
            'tab2',
          ]
        },
        {
          label: 'Icon',
          value: 'tab2_icon',
          showFields: [
            'icon2',
          ]
        }
      ]
    },
    {
      type: 'select',
      name: 'tab3_choice',
      label: 'Do you want text or icon?',
      choices: [
        {
          label: 'Text',
          value: 'tab3_text',
          showFields: [
            'tab3',
          ]
        },
        {
          label: 'Icon',
          value: 'tab3_icon',
          showFields: [
            'icon3',
          ]
        }
      ]
    },
  ],
  // Arrange Fields
    arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'text' ]
    },
    {
      name: 'tabs1',
      label: 'First Tab',
      fields: [ 'tab1_choice', 'tab1', 'icon1', 'text1' ]
    },
    {
      name: 'tabs2',
      label: 'Second Tab',
      fields: [ 'tab2_choice', 'tab2', 'icon2', 'text2' ]
    },
    {
      name: 'tabs3',
      label: 'Third Tab',
      fields: [ 'tab3_choice', 'tab3', 'icon3', 'text3' ]
    }
  ]

};
