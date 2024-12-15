#!/bin/bash
> /usr/share/nginx/html/envs.js
echo 'window.BASE_URL="'${BASE_URL}'";'>> /usr/share/nginx/html/envs.js
echo 'window.CLOUD_PROXY_URL="'${CLOUD_PROXY_URL}'";'>> /usr/share/nginx/html/envs.js
echo 'window.API_HOST_URL="'${API_HOST_URL}'";'>> /usr/share/nginx/html/envs.js
echo 'window.DOC_HOST_URL="'${DOC_HOST_URL}'";'>> /usr/share/nginx/html/envs.js
nginx
tail -f /dev/null