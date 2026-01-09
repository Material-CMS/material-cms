<p align="center">
  <a href="https://github.com/Material-CMS/material-cms">
    <img src="logo.png" alt="Logo" width="140" height="140">
  </a>

  <h3 align="center">Material CMS</h3>

  <p align="center">
    The ultimate website builder for everyone from self-employed to business or enterprise, Material-CMS is easy to use, fast, secure. You can present content in extremely diverse ways, through its reusable content. No templates needed redesign your website in minutes without losing the speed of a static page.
    <br />
    <a href="https://material-cms.com/"><strong>Website</strong></a>
    <br />
    <br />
    <a href="https://demo.material-cms.com/">Demo</a>
    ·
    <a href="https://github.com/Material-CMS/material-cms/issues">Report Bug</a>
  </p>
</p>

# Material CMS

- Ultra fast
- Secure
- Business ready
- Lighthouse maximum
- Easy to use
- Extremely versatile
- Realtime JS
- Extensible through plugins
- Developer friendly
- Galleries with JQuery append AJAX

## Google Lighthouse

![Screenshot](lighthouse.png)

## Compatible Plugins Apostrophe

You can use all plugins from apostrophe cms

[Apostrophe CMS Extensions](https://apostrophecms.com/extensions).

## Installing instructions

### Install Dependencies
- git
- nodejs 20.x or higher
- redis-server
- mongodb
- imagemagick

```bash
# clone repository
git clone https://github.com/felixlberg/material-cms

# cd into the new project
cd material-cms

# Install dependencies
npm install

# Copy local.example.js to data/ and add a individual session secret to be able to login
cp local.example.js data/local.js

# (Optional) Start mongodb and redis with docker for development purposes
npm run dev:docker:up

# Replace USERNAME with your individual name and add it to admin group; prompts for password
node app.js apostrophe-users:add USERNAME admin
# Go go go!
npm start

# Open Browser "http://localhost:3000/login" to login with your user to add content
```

## Production

For server specific changes add the file `data/local.js`.
You will find an example under `local.example.js` in root directory. Change `baseUrl` and add a session secret.
Modify the file accoring to your wishes, remove modules that you don't need

## Development

### Apostrophe CMS v2 Documentation

The [Apostrophe CMS v2 Documentation](docs/apostrophe-v2-docs) provides a complete reference for ApostropheCMS v2 development, from beginner tutorials to advanced API documentation.

Documentation Organization:
```bash
docs/apostrophe-v2-docs
├── advanced-topics
│   ├── advanced-pages-topics
│   ├── advanced-pieces-topics
│   ├── database
│   └── promise-events
├── core-concepts
│   ├── apostrophe-search
│   ├── editable-content-on-pages
│   ├── front-end-assets
│   ├── global-settings
│   ├── modules
│   ├── pages-and-navigation
│   ├── reusable-content-pieces
│   ├── users-and-permissions
│   └── working-with-templates
├── devops
│   ├── cloud
│   └── deployment
├── getting-started
├── howtos
└── reference
    ├── field-properties
    ├── field-types
    └── modules
        ├── apostrophe-admin-bar
        ├── apostrophe-any-page-manager
        ├── apostrophe-areas
        ├── apostrophe-assets
        ├── apostrophe-attachments
        ├── apostrophe-browser-utils
        ├── apostrophe-custom-pages
        ├── apostrophe-docs
        ├── apostrophe-doc-type-manager
        ├── apostrophe-files
        ├── apostrophe-files-widgets
        ├── apostrophe-global
        ├── apostrophe-groups
        ├── apostrophe-html-widgets
        ├── apostrophe-images
        ├── apostrophe-images-widgets
        ├── apostrophe-jobs
        ├── apostrophe-login
        ├── apostrophe-modal
        ├── apostrophe-module
        ├── apostrophe-notifications
        ├── apostrophe-oembed
        ├── apostrophe-pages
        ├── apostrophe-pieces
        ├── apostrophe-pieces-pages
        ├── apostrophe-pieces-widgets
        ├── apostrophe-polymorphic-manager
        ├── apostrophe-rich-text-widgets
        ├── apostrophe-schemas
        ├── apostrophe-search
        ├── apostrophe-tags
        ├── apostrophe-ui
        ├── apostrophe-users
        ├── apostrophe-utils
        ├── apostrophe-versions
        ├── apostrophe-video-fields
        ├── apostrophe-video-widgets
        └── apostrophe-widgets
```
Learning Progression:
1. Getting Started - Environment setup & basic site creation
2. Core Concepts - Fundamental Apostrophe features & tools
3. Advanced Development - Deep dive into advanced features
4. DevOps - Production deployment & configuration
Reference Materials:
  - Module Reference - Complete coverage of Apostrophe modules
  - Schema Field Types - 22 different field types with detailed documentation
  - Schema Field Properties - Configuration options for fields
  - Core API - Server and browser-side apos object documentation
  - Glossary - Terminology and concepts
  Practical Guides:
  - HOWTOs - 18 practical guides covering common tasks and solutions
  - Topics range from Docker deployment to custom field types
  Key Features Documented
  Field System:
  - 22 field types (area, array, attachment, boolean, etc.)
  - Comprehensive property system (choices, options, sortify, etc.)
  - Relationship management (joinByOne, joinByArray)
  Module System:
  - 10+ core modules documented
  - Browser and server-side APIs
  - Template and asset management
  Development Tools:
  - Custom schema field creation
  - Admin bar customization
  - Form building capabilities
  - Session management (Redis)
This documentation provides a complete reference for ApostropheCMS v2 development, from beginner tutorials to advanced API documentation.

----

For more infos about Materialize , visit [Materialize](https://materializecss.com/).
