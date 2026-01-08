module.exports = {
  apps: [{
    name: 'material-cms-dev',
    script: 'app.js',
    output: 'data/temp/dev.log',
    error: 'data/temp/dev.log',
    log_type: 'json',
    time: true,
    env: {
      NODE_ENV: 'dev'
    }
  }]
};