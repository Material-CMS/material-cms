// Settings specific to this server. Change the URL
// if you are deploying in production. Then copy to
// data/local.js. That folder is shared by all
// deployments in our stagecoach recipe
module.exports = {
  baseUrl: 'http://localhost:3000',
  modules: {
    // Set a Secre for your Session
    // https://docs.apostrophecms.org/howtos/storing-sessions-in-redis.html#what-about-caches
    'apostrophe-express': {
      session: {
        secret: 'put-your-secret-here'
      }
    }
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
    }
    // Apostrophe has full-text search capabilities built set searched pages here
    // https://docs.apostrophecms.org/core-concepts/apostrophe-search/search.html
    'apostrophe-search': {
      // types: [
      //   'home'
      // ]
    },
    // Add parked page for search fuctions. Parked pages
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
    },
    // Change default Port
    'apostrophe-express': {
      // port: 3001
    },
    // Minify Html
    'apostrophe-templates': {
      minify: (process.env.ENV === 'prod') // minify: true
    },
    // Minify Assets
    'apostrophe-assets': {
      minify: (process.env.ENV === 'prod') // minify: true
    },
    // DB performance test tool
    'apostrophe-profiler': {
    }
  }
};
