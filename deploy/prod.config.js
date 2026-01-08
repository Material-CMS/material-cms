module.exports = {
  apps: [{
    name: 'material-cms',
    script: 'app.js',
    output: 'data/temp/prod.log',
    error: 'data/temp/prod.log',
    log_type: 'json',
    time: true,
    env: {
      NODE_ENV: 'prod'
    }
  }]
};