$(function() {
    'use strict';

    // Init infiniscroll
    // Much thanks to Gilbert Pellegrom
    // https://github.com/gilbitron/Infiniscroll
    $('.ajax-append').infiniscroll({
      navSelector: '.pagination',				// Selector for your static naivgation (this will be hidden)
      nextSelector: '.pagination a.next',		// Selector for the NEXT link (e.g. to page 2)
      loadingSelector: '.loading',			// Selector for the loading element
      pageFragment: '.ajax-append',				// Selector for the content you want to extract from the response
      scrollBuffer: 200,						// The scroll amount in px before the bottom of the page that Infiniscroll should start to load the next page
      scrollOnLoad: true,						// Should the window scroll to the position of the newly loaded content (if the user is at the bottom of the page)
      scrollOnLoadDistance: 200,				// The distance to scroll down when new content is loaded,
      scrollOnLoadSpeed: 500,					// The speed to scroll down when new content is loaded
      onInit: function(){},					// Callback after plugin has loaded
      beforeContentLoaded: function(link){},	// Callback before new content is loaded
      afterContentLoaded: function(html){}	// Callback after new content has been loaded
    });

});
