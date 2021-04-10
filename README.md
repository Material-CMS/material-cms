# Material CMS

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c0434c9aea0f469db3b19c3476dc18f6)](https://www.codacy.com/app/felixlberg/fullpage-cms?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=felixlberg/fullpage-cms&amp;utm_campaign=Badge_Grade)
----

## Ultra fast CMS with material design, reusable widgets.

**🧠 Developer Ready**
**🐳 Dockerfile**
**💻📲 Mobile Ready**
**🔖 OnePage Navigation**
**⚫️ Material Design**

You can build a your content management system in 10 Minutes and modify your website with fullpage scroll, materialized content, six different widgets, thousands of different possibility's trough reusable content and layered settings.

![Screenshot](screenshot.png)

## Installing instructions

### Install Dependencies
- git
- nodejs 8.x or 10.x
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

### Email sending

To send customer requests wit smtp email, copy `local.example.js` to add the following to `data/local.js` ther you can put in your pivate config.

````javascript
'apostrophe-email': {
  nodemailer: {
    host: 'SMTP SERVER',
    port: 587,
    secure: false, // true if 465
    auth: {
        user: 'USER',
        pass: 'XXXXX'
    }
  }
}
````

## Development

### Materialize components ES6

Materialize is written in ECMAScript 6. The version of Uglify in use in Apostrophe 2.x does not necessarily support ES6 syntax! So if you want to add new materialize components you need to run `npm build` in project folder and copy the desired files from the created build folder to `lib/apostrophe-assets/vendor/materialize/components`.

----

For more documentation on Apostrophe CMS, visit [Apostrophe CMS](http://apostrophecms.com).

For more infos about Materialize , visit [Materialize](https://materializecss.com/).
