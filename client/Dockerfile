# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:24.1.0-slim AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code

FROM development AS build

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN npm run build

FROM nginx:1.28.0-alpine-slim

COPY --from=build /code/dist /var/www/dist/
COPY --from=build /code/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]