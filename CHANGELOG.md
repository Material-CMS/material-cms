# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Materialize tab widget
- Add description text to text-show page when not blog
- UPPERCASE for apostrophe-rich-texts
- Change nav title to page title
- Replace slider with swiper
- Hide card-reveal in swiper
- Text show page fixes
- Add intro widget for all pages
- Section background gradient
- Add page background color chooser
- Add events pages
- Kenburns for nav background image
- Create code widget
- Create Iframe widget
- Local video for blog entries
- Ofcanvas option for grid widgets
- Color choices for pages
- New Lightbox animation

### Fixed
- Form send button not using button color
- Rewrite texts-pages function to pure javascript
- Pro: language selector in nav color

## [0.9.8 ] - 08.03.2023

### Added
- Video local files
- Underline for active nav elements
- Custom fonts
- Reworked layout widgets
- CKEditor add attributes and classes to elements programatically
- Auto flow text to all apostrophe-rich-texts
- Shape dividers as SVG & shape divider path array
- Text justify for texts and people
- Call to action button as widget
- Rewrite jquery dependent functions
- New lightbox function
- New expand function

### Fixed
- Specific page script context
- Improved anchor-scroll function

### Removed
- Unnecessary styles from apostrophe-rich-texts
- Jquery library for lean mode

## [0.9.7 ] - 29.05.2021

### Added
- Apostrophe-forms
- Swiper as widget
- Hover effects for events-widget
- Center for text-widget titles
- Card reveal function
- Gallery image click to link option
- Infinite Scroll through external jquery plugin
- Parallax background image for sections
- Navigation bg image with gradient overlay and pushpin
- Manual Navigation settings
- Half height slider with gradient overlay, kenburns and extra content
- Section headers
- Updated dependencies
- Add prefixes to pieces to minimize naming conflicts
- Infinite glue widgets
- Jquery initialization improvements
- Reworked navigations
- Reworked galleries
- Add link and page-link widgets for extraLink in text-widgets
- Replaced centerTitle in texts with titleAlign
- Add force aspect-ratio 1:1 to double-widget
- Add anchor to rich-text-widet options
- Add gallery expand for card widgets

### Removed
- Unnecessary javascript trough lean front end
- apostrophe-image-widgets stop function

### Fixed
- Admin-ui improvements

## [0.9.6 ] - 2021-04-02

### Added
- One & two column gallery
- apostrophe core v2.114.0
- Rename Project to Material-CMS

### Fixed
- Remove slider indicator items when only one image
- Small admin UI fixes

## [0.9.5 ] - 2020-06-01

### Added
- Modern Images with srcset
- Added apostrope 2.107.0
- Less mixins for better compatibility for old browsers

### Removed
- Whole section cards features

### Fixed
- Navbar mobile overlay problem
- Gallery fixes
- Contact form UI fixes
- Admin UI Colors


## [0.9.4 ] - 2020-05-15

### Added
- Tables, table-widgets, table-pages
- Transparence for widgets
- Partials as includes
- Text widgets side image left
- Glue widgets
- Codacy configuration file
- New People widget
- Additional user Styles
- Image credit for slider

### Removed
- Whole section full card functions

### Fixed
- Lots of UI fixes
- Regroup all Sections
- Code formatting and cleaning

## [0.9.3 ] - 2020-05-07

### Added
- Share buttons widgets
- Contact button widgets as include
- Better palette styles include mechanism
- Palette styles as styles.html
- Updated apostrophe to 2.106.3 & apostrophe-site-map to 2.5.3

## [0.9.2 ] - 2020-04-22

### Added
- New text-carousel-widget
- New slider-widget
- Infinite gallery piece, page and widget with Ajax
- Updated apostrophe to 2.106.2 & apostrophe-seo to 1.2.4

### Fixed
- Contact form
- Exclude legal & privacy info from search engine indexing

## [0.9.1 ] - 2020-03-01

### Added
- Redis with apostrophe-caches-redis for better performance uncomment
- Apostrophe-palette-global for better CSS palette options
- Apostrophe-pieces-orderings-bundle for Section Orderings
- Section-pages for display section pieces as page
- Infinite-section-pages for display pieces as page with Ajax infinite scroll
- People as pieces with pages and widget

### Fixed
- Deactivated apostrophe-optimizer for non cloud version
- Apos-reorganaze-tree checkboxes

## [0.9.0 ] - 2020-01-02

### Added
- New Nodemailer variables and settings for contact form sending
- Additional links in navigation
- Links array on widget level use this for easy future implementation of arrays without join or area ( example in sections-widgets/widget.html line:24 )
- Better image rendering with srcset

### Fixed
- Small fixes
- Admin UI Color fixes

## [0.8.0 ] - 2019-12-04

### Added
- Apostrophe-core 2.100.2
- Html minification with apostrophe-templates & html-minifier
- Testing and debugging mechanism apostrophe-profiler
- other updated apostrophe modules
- Separate cloud branch with prod-bundle for deployment at heroku (must be merged regularly)

### Fixed
- UI Fixes
- Updates

## [0.7.9 ] - 2019-08-14

### Added
- Added side image for sections
- Carousel title and other improvements

### Fixed
- Small fixes

## [0.7.8 ] - 2019-08-11

### Added
- Huge improvements for text widgets

### Fixed
- Carousel widgets UI fixes

## [0.7.7 ] - 2019-08-03

### Added
- Apostrophe 2.93

### Fixed
- Arranged fields for global
- No dropdown bug when single page

## [0.7.7 ] - 2019-07-14

### Added
- Shadow activator for all images
- Contact button
- Apostrophe 2.92.1

### Fixed
- small fixes

## [0.7.6 ] - 2019-05-06

### Added
- Page Down Button
- Fullpage scroll now with css scroll-snap only ( no js )

### Fixed
- Lots of UI fixes
- Pagination script now works seamlessly

## [0.7.5 ] - 2019-05-03

### Fixed
- Fire onScroll event only in section-wrapper

## [0.7.4 ] - 2019-04-27
### Added
- Materialize as components for better performance
- Babel for transpiling materialize components to es5
- build directory for es5 components
- scr directory for source es6 components
- anime.min.js as static vendor script

## [0.7.3 ] - 2019-04-27
### Added
- Updated apostrophe@2.88.1
- Updated apostrophe-favicons@1.1.2
- Updated apostrophe-palette@2.0.20
- Updated apostrophe-site-map@2.5.1
- Replaced smartscroll with other scroll jack script

### Fixed
- Button color schema and css
- Materialize TypeError
- Rearranged fields

## [0.7.2 ] - 2019-03-17
### Added
- All css files get pushed by apostrophe-assets
- Updated apostrophe to v2.83
- Button icons

### Fixed
- Button color schema and css
- Bugfixes

## [0.7.1 ] - 2019-03-07
### Added
- Apostrophe-rich-text-widgets for text widgets, legal and privacy
- GDPR compliance for email sending
- Own radius class for border radius palette

### Fixed
- Lot of UI fixes
- Mobile height

## [0.7.0 ] - 2019-03-06
### Added
- Templating system for colors
- Partly changed admin ui to Materialize
- Better mobile section height
- Sections can now be connected
- Apostrophe-pages menu with materialize tooltips

## [0.6.3 ] - 2019-01-03
### Added
- Materialize adminBar and apostrophe-pages menu

### Fixed
- Lots of Admin UI fixes

## [0.6.2 ] - 2018-12-20
### Added
- Text-widget for contact-form thank you message

### Fixed
- Small fixes

## [0.6.1 ] - 2018-12-05
### Added
- Legal info and privacy consent

### Fixed
- Small fixes

## [0.6.0 ] - 2018-12-04
### Added
- Apostrophe architecture contact form
- Custom apostrophe string schema variable for passing style values as material icons

## [0.5.9 ] - 2018-11-24
### Fixed
- Inline accent color implementation for input strings on front.

### Removed
- Footer input field prepared for next dynamic contact form widgets

## [0.5.8 ] - 2018-11-17
### Added
- Navbar independent color for apostrophe-palette-global in app.js
- Apply Accent Color mechanics to materialize active items
- Better Color Overrides for future templates
- Background Colors for Events and Texts

### Fixed
- Missing default schema for sections default appearance
- Missing color overrides for materialize form and slides
- Collapsible roundness
- Other small Fixes
- pieceIds of undefined error, Fixed by vendor in apostrophe-favicons at 1.0.16

## [0.5.7 ] - 2018-11-14
### Added
- Roundness for all elements in palette

### Fixed
- Workaround for pieceIds of undefined error, Fixed apostrophe-favicons at 1.0.14

## [0.5.6 ] - 2018-11-07
### Added
- Dynamic tab navigation
- Dropdown Implementation
- Copyright variables at navigation

### Fixed
- Html Errors because of missing empty spaces by nunjucks


## [0.5.5 ] - 2018-11-01
### Added
- Footer widget in section widget which pulls values from global doc
- Dynamic choices for section widget based on select fields
- Pieces widgets get slug as ID
- Horizontal card layout for text widgets

### Changed
- Moved navigation and fullpage init and vendor scripts to sections
- Main widgets now movable and not cloneable

## [0.5.4 ] - 2018-10-29
### Added
- Color picker for card title
- Modular slide widgets as section widgets or as page widgets

## [0.5.3] - 2018-10-28
### Fixed
- Section navigation
- Removed useless function in site.js navigation module
- HTML cleaning
- Double widget wrong widget names

### Added
- Text widget add image
- Text widget Header color chooser with fallback to accent-color class
- Images now use Material Box ( Lightbox plugin )
- Projection filters for Pieces widgets
- Section Header color chooser with fallback to accent-color class

## [0.5.1] - 2018-10-14
### Added
- Section navigation activation selector for testing
- Apostrophe-palette for in context css editing

## [0.5.0] - 2018-10-14
### Added
- Sections-widget for infinite creation of section ( beware performance right now no infinite scrolling ).

### Changed
- Widget naming convention to purpose only.
- Page Structure and app.js
- Reduced code on Texts-widgets
- Code convention

### Removed
- Sections in custom pages because it was limited to pre defined values and was really lame.
- Custom pages options.

## [0.4.0] - 2018-10-14
### Added
- Smartscroll plugin for fullpage scrolling from [d4nyll](https://github.com/d4nyll/smartscroll).
- custom pagination script

### Removed
- fullpage.js because it caused to much errors.

## [0.2.0] - 2018-03-12
### Added
- apostrophe-global, apostrophe-seo and apostrophe-open-graph testing production modules.
- apostrophe-custom-pages for Page options.

### Fixed
- fullpage.js related bugs.

## [0.1.0] - 2018-01-06
### Added
- fullpage.js library for fullpage scrolling from [alvarotrigo](https://github.com/alvarotrigo/fullPage.js).

### Fixed
- lots of bugs.

## [0.0.8] - 2017-12-14
### Added
- More modules, custom fields for icons and description.

### Changed
- Started with Materialize all stuff with [Dogfalo](https://github.com/Dogfalo/materialize).

### Removed
- events-pages.

## [0.0.6] - 2017-12-10
### Added
- New modules.

### Fixed
- Fix typos in recent README changes.
- Update outdated unreleased diff link.

## [0.0.4] - 2017-11-18
### Added
- Almost everything!
