$(document).ready(function() {
  // Fullpage Scroll EventEmitter, Options, Init
  //Add Event Emitter Object
  var ee = new EventEmitter();
  //Options passing to Smartscroll
  var options = {
    mode: "set", // "vp", "set"
    autoHash: false,
    sectionScroll: true,
    initialScroll: true,
    keepHistory: false,
    sectionWrapperSelector: ".section-wrapper",
    sectionClass: "section",
    animationSpeed: 400,
    headerHash: null,
    breakpoint: "400px",
    eventEmitter: ee,
    dynamicHeight: true,
    bindSwipe: true
  };
  //Initialisation
  $.smartscroll(options);
});
