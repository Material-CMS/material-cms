// Settings specific to this server. Change the URL
// if you are deploying in production.
module.exports = {
  baseUrl: 'http://localhost:3000',
  modules: {
    // Minify Html
    'apostrophe-templates': {
      minify: (process.env.NODE_ENV === 'prod')
    },
    // Minify Assets
    'apostrophe-assets': {
      minify: (process.env.NODE_ENV === 'prod')
    },
    // Set a Secre for your Session
    // https://docs.apostrophecms.org/howtos/storing-sessions-in-redis.html#what-about-caches
    'apostrophe-express': {
      session: {
        secret: 'YOUR_SECRET'
      }
      // Touse other port than 3000
      // port: 3001
    },
    // Internationalization
    'apostrophe-i18n': {
      locales: ['en', 'de'],
      defaultLocale: 'en',
      cookie: 'material-cms.locale',
      updateFiles: true
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
    },
    // DB performance test tool
    // remove in production
    'apostrophe-profiler': {
    }
  }
};
