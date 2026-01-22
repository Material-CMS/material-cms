#!/bin/bash
/usr/bin/chromium \
    --remote-debugging-port=9223 \
    --headless=new \
    --no-first-run \
    --no-default-browser-check \
    --disable-gpu \
    http://localhost:3000