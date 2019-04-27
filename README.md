## Material CMS

[![Build Status](https://travis-ci.org/felixlberg/fullpage-cms.svg?branch=master)](https://travis-ci.org/felixlberg/fullpage-cms)

----

### Ultra fast CMS with material design, reusable widgets.

**🧠 Developer Ready**
**🐳 Dockerfile**
**💻📲 Mobile Ready**
**🔖 OnePage Navigation**
**⚫️ Material Design**

You can build a your content management system in 10 Minutes and modify your website with fullpage scroll, materialized content, six different widgets, thousands of different possibility's trough reusable content and layered settings.

![Screenshot](screenshot.png)

### Installing instructions

````
# clone repository
git clone https://github.com/felixlberg/fullpage-cms
# cd into the new project
cd fullpage-cms
# Install dependencies
npm install
# Add an admin user to the admin group; prompts for password
node app.js apostrophe-users:add admin admin
# Go go go!
mpm start
# Open Browser "http://localhost:3000/login" to login with your user to add first content
````

### Materialize components ES6

Materialize is written in ECMAScript 6. The version of Uglify in use in Apostrophe 2.x does not necessarily support ES6 syntax! So if you want to add new materialize components you need to run `npm build` in project folder and copy the desired files from the created build folder to `lib/apostrophe-assets/vendor/materialize/components`.

----

For more documentation on Apostrophe CMS, visit [Apostrophe CMS](http://apostrophecms.com).

For more infos about Materialize , visit [Materialize](https://materializecss.com/).
