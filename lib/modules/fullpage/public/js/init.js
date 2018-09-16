$(document).ready(function() {
  // Fullpage Initialization
  $('#fullpage').fullpage({
    //Navigation
    menu: '.nav-activator',
    navigation: false,
    navigationPosition: 'right',
    navigationTooltips: ['slide01', 'slide02'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',
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
    normalScrollElements: '.apos-manage-grid-view , .apos-modal-slideable , .apos-modal-content , .sidenav',
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
    slideSelector: '.slide',
    lazyLoading: false,
    //Lazy loading for all hadditional sections
    afterRender: function(){
      var $animated = $('.animated');
  		$animated.addClass('in');
	   }
  });
});
