FROM --platform=$BUILDPLATFORM node:24.1.0-slim AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

FROM development AS build

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}
ENV VITE_API_URL=__API_URL_PLACEHOLDER__

RUN npm run build

FROM nginx:1.28.0-alpine-slim

COPY --from=build /code/dist /var/www/dist/
COPY --from=build /code/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/conf.d

EXPOSE 80

COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
