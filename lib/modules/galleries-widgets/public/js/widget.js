apos.utils.widgetPlayers['galleries'] = function(el, data, options) {

  // Initialize lightbox effect
  if (data.lightboxOn) {
     var lightboxElement = el.getElementsByClassName('lightbox')[0];
     if (!lightboxElement.lightboxActivated) {
       ligthboxEffect(lightboxElement);
     }
  }

};
