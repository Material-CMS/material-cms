module.exports = {
  apps: [{
    script: 'app.js',
    output: 'data/temp/prod.log',
    error: 'data/temp/prod.log',
    time: true,
    env: {
      NODE_ENV: 'prod'
    }
  }]
};