'use strict';
var infiniscroll = require('./infiniscroll.js');
// var el = document.querySelector('.ajax-append');
// if (el) {
//   new infiniscroll(el, {
//     navSelector: '.pagination',
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


console.log('page.js');
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
