apos.utils.widgetPlayers['iframe'] = function(el, data, options) {

  var iframe = el.querySelector('iframe');

  // Hide preview image when iframe is loaded
  var loadingImage = el.querySelector('.loading-image');
  if (loadingImage) {
    function onMyFrameLoad() {
      setTimeout(function() {
        var overlayAnimation = anime({
          targets: loadingImage,
          opacity: '0',
          duration: 500,
          easing: 'linear'
        });

        setTimeout(function() {
          loadingImage.classList.add('hide');
        }, 500);

      }, data.previewImageHideTimer);
    };
  }

  // Add event listener
  iframe.addEventListener('load', onMyFrameLoad);

};
