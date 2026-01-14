module.exports = {
  apps: [{
    script: 'app.js',
    output: 'data/temp/prod.log',
    error: 'data/temp/prod.log',
    env: {
      NODE_ENV: 'prod'
    }
  }]
};