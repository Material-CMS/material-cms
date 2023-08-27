apos.utils.widgetPlayers['iframe'] = function(el, data, options) {

  var iframe = el.querySelector('iframe');
  var previewImage = el.querySelector('.background-image');

  // Hide preview image when iframe is loaded
  function onMyFrameLoad() {
    setTimeout(function() {
      var overlayAnimation = anime({
        targets: previewImage,
        opacity: '0',
        duration: 500,
        easing: 'linear'
      });
    }, data.previewImageHideTimer);
  };

  iframe.addEventListener('load', onMyFrameLoad);

};
