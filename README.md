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
- Realtime javascript
- Extensible through plugins
- Developer friendly

## Google Lighthouse

![Screenshot](lighthouse.png)

## Compatible Plugins Apostrophe

You can use all plugins from apostrophe cms

[Apostrophe CMS Extensions](https://apostrophecms.com/extensions).

## Installing instructions

### Install Dependencies
- git
- nodejs 8.x, 10.x, 12.x
- redis-server
- mongodb

````bash
# clone repository
git clone https://github.com/felixlberg/material-cms
# cd into the new project
cd material-cms
# Install dependencies
npm install
# Copy local.example.js to data and add a individual session secret to be able to login
cp local.example.js data/local.js
# Add an admin user to the admin group; prompts for password
node app.js apostrophe-users:add admin admin
# Go go go!
mpm start
# Open Browser "http://localhost:3000/login" to login with your user to add content
````

## Development

### Materialize components ES6

Materialize is written in ECMAScript 6. The version of Uglify in use in Apostrophe 2.x does not necessarily support ES6 syntax! So if you want to add new materialize components you need to run `npm build` in project folder and copy the desired files from the created build folder to `lib/apostrophe-assets/vendor/materialize/components`.

----

For documentation on Apostrophe CMS, visit [Apostrophe CMS](https://docs.apostrophecms.org/).

For more infos about Materialize , visit [Materialize](https://materializecss.com/).
