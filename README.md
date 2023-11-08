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
- nodejs 16.x or higher
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
# Copy local.example.js to data and add a individual session secret to be able to login
cp local.example.js data/local.js
# Replace USERNAME with your individual name and add it to admin group; prompts for password
node app.js apostrophe-users:add USERNAME admin
# Go go go!
npm start
# Open Browser "http://localhost:3000/login" to login with your user to add content
```

## Production

For server specific changes add the file `data/local.js`.
You will find an example under `local.example.js` in root directory.

```bash
# Copy file
cp local.example.js data/local.js
```

Change `baseUrl` and add a session secret.
Modify the file accoring to your wishes, remove modules that you don't need:

```javascript
// Settings specific to this server. Change the URL
// if you are deploying in production.
module.exports = {
  baseUrl: 'http://localhost:3000',
  modules: {
    // Minify Html
    'apostrophe-templates': {
      minify: (process.env.ENV === 'prod') // minify: true
    },
    // Minify Assets
    'apostrophe-assets': {
      minify: (process.env.ENV === 'prod') // minify: true
    },
    // Set a Secre for your Session
    // https://docs.apostrophecms.org/howtos/storing-sessions-in-redis.html#what-about-caches
    'apostrophe-express': {
      session: {
        secret: 'YOUR_SECRET'
      }
      // use other port than 3000
      // port: 3001
    },
    // Email Settings for nodemailer
    'apostrophe-email': {
      nodemailer: {
        host: 'SMTP_SERVER', // or use: process.env.SMTP_SERVER
        port: 587,
        secure: false,
        auth: {
            user: 'SMTP_USER', // or use: process.env.SMTP_USER
            pass: 'SMTP_PW' // or use: process.env.SMTP_PW
        }
      }
    },
    // Apostrophe has full-text search capabilities built set searched pages here
    // https://docs.apostrophecms.org/core-concepts/apostrophe-search/search.html
    'apostrophe-search': {
      // types: [
      //   'home'
      // ]
    },
    // Add parked page for search functions. Parked pages
    // configures certain pages to be automatically created
    // and refreshed whenever the site starts up.
    'apostrophe-pages': {
      // park: [
      //   {
      //     title: 'Search',
      //     slug: '/search',
      //     type: 'apostrophe-search',
      //     label: 'Search',
      //     published: true
      //   }
      // ]
    },
    // If these are your db settings then you don't need to be explicit. If not
    // you can uncomment this and get more specific.
    'apostrophe-db': {
      // uri: 'mongodb://localhost:27017/apostrophe-sandbox'
      // There is legacy support for host, port, name, user and password options,
      // but this is not necessary. They can all go in the uri option like this:
      // mongodb://user:password@host:port/dbname
    }
  }
};

```


## Development

### Materialize components ES6

Materialize is written in ECMAScript 6. The version of Uglify in use in Apostrophe 2.x does not necessarily support ES6 syntax! So if you want to add new materialize components you need to run `npm build` in project folder and copy the desired files from the created build folder to `lib/apostrophe-assets/vendor/materialize/components`.

----

For documentation on Apostrophe CMS, visit [Apostrophe CMS](https://docs.apostrophecms.org/).

For more infos about Materialize , visit [Materialize](https://materializecss.com/).
