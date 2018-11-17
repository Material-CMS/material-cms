# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Sub widgets / joinByOne for texts-widgets
- Testing and debugging mechanism
- Video locals files
- More widget types
- Apostrophe architecture contact form, right now its amazon ses
- Better Image rendering with srcset
- Integrate apostrophe-i18n Module for multilingual support
- Full GDPR Compliance with cookie chooser and privacy opt in for
- Templating system for colors

### Fixed
- Fire onScroll event only in section-wrapper

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
- pieceIds of undefined error, fixed by vendor in apostrophe-favicons at 1.0.16

## [0.5.7 ] - 2018-11-14
### Added
- Roundness for all elements in palette

### Fixed
- Workaround for pieceIds of undefined error, fixed apostrophe-favicons at 1.0.14

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
