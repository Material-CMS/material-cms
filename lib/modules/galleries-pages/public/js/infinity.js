function infiniscroll(el, options) {
  this.el = el;
  this.options = Object.assign({
    navSelector: '.pagination',
    nextSelector: '.pagination a.next',
    loadingSelector: '.loading',
    pageFragment: '.ajax-append',
    scrollBuffer: 200,
    scrollOnLoad: true,
    scrollOnLoadDistance: 200,
    scrollOnLoadSpeed: 500,
    onInit: function () {},
    beforeContentLoaded: function (link) {},
    afterContentLoaded: function (html) {},
  }, options);
  this._isLoading = false;
  this._nextLink = null;
  this._endReached = false;
  this.init();
}

infiniscroll.prototype = {
  init: function () {
    var self = this;
    document.querySelector(this.options.navSelector).style.display = 'none';
    window.addEventListener('scroll', function () {
      self.doScroll.apply(self);
    });
    this.options.onInit.call(this);
  },
  doScroll: function () {
    if (this._isLoading) return;
    if (window.scrollY >= document.body.scrollHeight - window.innerHeight - this.options.scrollBuffer) {
      this._isLoading = true;
      this._nextLink || (this._nextLink = document.querySelector(this.options.nextSelector));
      if (!this._endReached) {
        this.options.beforeContentLoaded.call(this, this._nextLink);
        var loadingEl = document.querySelector(this.options.loadingSelector);
        if (loadingEl) loadingEl.style.display = 'block';
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this._nextLink.getAttribute('href'));
        xhr.onload = function () {
          var frag = document.createRange().createContextualFragment(xhr.response),
            content = frag.querySelector(self.options.pageFragment),
            s = false;
          self.options.scrollOnLoad && window.scrollY === document.body.scrollHeight - window.innerHeight && (s = true);
          content.querySelector(self.options.navSelector).style.display = 'none';
          self._nextLink = content.querySelector(self.options.nextSelector);
          if (loadingEl) loadingEl.style.display = 'none';
          self.el.appendChild(content);
          s && window.scrollTo(0, window.scrollY + self.options.scrollOnLoadDistance);
          self._isLoading = false;
          self.options.afterContentLoaded.call(self, content);
          if (!self._nextLink) self._endReached = true; // Stop infinite loop if no more pages to load
        };
        xhr.send();
      } else {
        this._endReached = true; // Stop infinite loop if no more pages to load
      }
    }
  }
};

var el = document.querySelector('.ajax-append');
if (el) {
  new infiniscroll(el, {
    navSelector: '.pagination',
    nextSelector: '.pagination a.next',
    loadingSelector: '.loading',
    pageFragment: '.ajax-append',
    scrollBuffer: 200,
    scrollOnLoad: true,
    scrollOnLoadDistance: 200,
    scrollOnLoadSpeed: 500,
    onInit: function () {},
    beforeContentLoaded: function (link) {},
    afterContentLoaded: function (html) {}
  });
}
