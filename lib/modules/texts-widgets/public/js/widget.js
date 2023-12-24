apos.utils.widgetPlayers['texts'] = function(el, data, options) {

  var texts = el.querySelectorAll('.card.text');
  for (var i = 0; i < texts.length; i++) {
    // Check background color
    if (!texts[i].classList.contains('dark-background')) {
      applyBackgroundColorClass(texts[i]);
    }
    // Initialize materialize collapsible for non blog texts
    if(!options.blog) {
      M.Collapsible.init(texts[i].getElementsByClassName('collapsible')[0]);
    }
  }
};
