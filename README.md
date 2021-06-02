# Material CMS

## Ultra fast CMS with material design, reusable widgets.

**🧠 Developer Ready**
**🐳 Dockerfile**
**💻📲 Mobile Ready**
**🔖 OnePage Navigation**
**⚫️ Material Design**

The ultimate website builder for everyone from self-employed to business or enterprice, Material-CMS is easy to use, fast, secure and of course its main ability, the almost unbelievable versatility should not be forgotten.

No templates needed redesign your website in minutes without losing the speed of a static page.

![Screenshot](screenshot.png)

## Ridiculously Fast

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
