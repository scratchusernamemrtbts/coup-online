#!/bin/sh
set -e
cd /app/server || exit 1
time=$(date -Iseconds)
node index.js > /logs/log-${time}.txt 2>/logs/error-${time}.txt & 
nginx -g 'daemon off;'
