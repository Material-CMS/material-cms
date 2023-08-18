/*! *****************************************************************************
Copyright 2022 Felix Langenberg https://github.com/felixlberg

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */

'use strict';
// Define function
function infinity(el, options) {
  this.el = el;
  this.options = Object.assign({
    navSelector: null,
    nextSelector: null,
    loadingSelector: null,
    pageFragment: null,
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

// Protoype function
infinity.prototype = {
  init: function () {
    var self = this;
    window.addEventListener('scroll', function () {
      self.doScroll.apply(self);
    });
    this.options.onInit.call(this);
  },
  doScroll: function () {
    // return function if loading
    if (this._isLoading) return;
    // actual scroll event
    if (window.scrollY >= document.body.scrollHeight - window.innerHeight - this.options.scrollBuffer) {
      this._isLoading = true;
      // get next link so next link will be never null
      this._nextLink || (this._nextLink = document.querySelector(this.options.nextSelector));
      // check if end is not reached
      if (!this._endReached) {
        this.options.beforeContentLoaded.call(this, this._nextLink);
        var loadingEl = document.querySelector(this.options.loadingSelector);
        if (loadingEl) loadingEl.style.display = 'block';
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this._nextLink.getAttribute('href'));
        xhr.onload = function () {
          var frag = document.createRange().createContextualFragment(xhr.response);
          var content = frag.querySelector(self.options.pageFragment);
          var s = false;
          content.classList.add('active');
          self.options.scrollOnLoad && window.scrollY === document.body.scrollHeight - window.innerHeight && (s = true);
          self._nextLink = content.querySelector(self.options.nextSelector);
          if (loadingEl) loadingEl.style.display = 'none';
          self.el.appendChild(content);
          s && window.scrollTo(0, window.scrollY + self.options.scrollOnLoadDistance);
          self._isLoading = false;
          self.options.afterContentLoaded.call(self, content);
          if (!self._nextLink) {
            self._endReached = true;
          }
        };
        xhr.send();
      } else {
        this._endReached = true;
      }
    }
  }
};

// Initialize new instance like this
// var el = document.querySelector('.ajax-append');
// if (el) {
//   new infinity(el, {
//     navSelector: '.pagination .pager',
//     nextSelector: '.pagination a.next',
//     loadingSelector: '.loading',
//     pageFragment: '.ajax-append',
//     scrollBuffer: 200,
//     scrollOnLoad: true,
//     scrollOnLoadDistance: 200,
//     scrollOnLoadSpeed: 500,
//     onInit: function () {},
//     beforeContentLoaded: function (link) {},
//     afterContentLoaded: function (html) {}
//   });
// }
