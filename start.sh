#!/bin/sh
set -e
cd /app/server || exit 1
node index.js >> /logs/log-$(date -Iseconds).txt & 
nginx -g 'daemon off;'
