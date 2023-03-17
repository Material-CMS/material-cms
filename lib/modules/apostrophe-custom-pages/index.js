module.exports = {
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        name: 'ajaxAppend',
        type: 'boolean',
        label: 'Activate Ajax Append Mode',
        help: 'Activate the ajax append mode which allows to create infinite scroll layouts (default: No)',
        def: false
      },
      {
        name: 'buttonText',
        type: 'string',
        label: 'Load More or Next button Text',
        help: 'Define text for the button on the end of the page which is eather \'Load More\' or \'Next Page\' depending of Ajax Append Mode (default: \'Load More\')',
      },
      {
        name: 'hideContactButton',
        type: 'boolean',
        label: 'Hide Contact Button on Page',
        help: 'Hide the contact button which can be activated in global for this specific page (default: No)',
        def: false
      }
    ].concat(options.addFields || []);
  }
};
