#!/bin/bash
echo 'window.BASE_URL="'${BASE_URL}'"'> /usr/share/nginx/html/envs.js
echo 'window.CLOUD_PROXY_URL="'${CLOUD_PROXY_URL}'"'> /usr/share/nginx/html/envs.js
nginx
tail -f /dev/null