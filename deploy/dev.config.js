module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      merge_logs: true,
      max_memory_restart: '2G',
      min_uptime: '10s',
      max_restarts: 10,
      log_file: 'data/temp/dev.log'
    },
    {
      name: 'chromium',
      script: 'deploy/launch_cdp.sh',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      merge_logs: true,
      log_file: 'data/temp/chromium.log',
      env: {
        DISPLAY: ':0'
      }
    }
  ]
}