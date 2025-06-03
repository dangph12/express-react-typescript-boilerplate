#!/bin/sh

# Create API proxy config if ENABLE_API_PROXY is set (for compose mode)
if [ "$ENABLE_API_PROXY" = "true" ]; then
  echo 'location /api {
    rewrite ^/api/(.*) /$1 break;
    proxy_pass http://server:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_frwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_connect_timeout 75s;
    proxy_read_timeout 300s;
  }' > /etc/nginx/conf.d/api-proxy.conf
else
  touch /etc/nginx/conf.d/api-proxy.conf
fi

# Replace API URL placeholder if provided
if [ ! -z "$VITE_API_URL" ]; then
  export VITE_API_URL="$VITE_API_URL"
  find /var/www/dist -name '*.js' -exec sed -i "s|__API_URL_PLACEHOLDER__|$VITE_API_URL|g" {} +
fi

nginx -g 'daemon off;'