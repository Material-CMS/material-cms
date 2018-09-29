$(document).ready(function() {
  // Fullpage Initialization
  $('#fullpage').fullpage({
    //License
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    scrollBar: true,
    //Navigation
    menu: '.nav-activator',
    //Scrolling
    css3: true,
    scrollingSpeed: 600,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    normalScrollElements: '.apos-ui',
    scrollOverflow: false,
    scrollOverflowReset: false,
    scrollOverflowOptions: null,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,
    bigSectionsDestination: null,
    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,
    //Design
    controlArrows: true,
    verticalCentered: true,
    paddingTop: '4.4rem',
    paddingBottom: '',
    fixedElements: '#header',
    responsiveWidth: 420,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: {
      type: 'reveal',
      percentage: 62,
      property: 'translate'
    },
    //Custom selectors
    sectionSelector: '.section',
    lazyLoading: false,
    //Lazy loading for all hadditional sections
    afterRender: function(){
      var $animated = $('.section:not(:first-child)');
  		$animated.addClass('in');
    }
  });
});
