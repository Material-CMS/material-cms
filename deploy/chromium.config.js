module.exports = {
  apps: [{
    name: 'chromium',
    script: 'scripts/launch_cdp.sh',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    output: 'data/temp/chromium.log',
    error: 'data/temp/chromium.log',
    env: {
      DISPLAY: ':0'
    }
  }]
}