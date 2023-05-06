apos.define('apostrophe-areas', {
  construct: function(self, options) {
    // Use the super pattern - don't forget to call the original method
    var superEnableCkeditor = self.enableCkeditor;
    self.enableCkeditor = function() {
      superEnableCkeditor();
      // Get CKEDITOR instance
      CKEDITOR.on('instanceReady', function(ev) {
        var editor = ev.editor;
        editor.dataProcessor.htmlFilter.addRules({
          elements : {
            p : function( element ) {
              // Add low-text class to all texts
              if ( !element.attributes.class ){
                element.attributes.class = 'flow-text';
              }
            },
            a : function( element ) {
              // Add accent-color class to all links
              if ( !element.attributes.class ){
                element.attributes.class = 'accent-color';
              }
              // Add add _blank and noopener and noreferrer to external links
              if ( !element.attributes.rel ){
                // Get content's a href values
                var url = element.attributes.href;
                // Extract host names from URLs (IE safe)
                var parser = document.createElement('a');
                parser.href = url;
                // Set additional attributes
                var hostname = parser.hostname;
                if ( hostname !== window.location.host) {
                    element.attributes.rel = 'noopener noreferrer';
                    element.attributes.target = '_blank';
                }
              }
            },
            li : function( element ) {
              // Add low-text class to all texts
              if ( !element.attributes.class ){
                element.attributes.class = 'flow-text';
              }
            }
          }
        });
      })
    };
  }
});
