FROM node:16.13.0-slim AS build

WORKDIR /app

RUN npm cache clean --force

COPY . .
RUN npm install --unsafe-perm
RUN npm run ng build

FROM nginx:latest AS nginx

COPY server.crt /certs/server.crt
COPY server.key /certs/server.key

COPY --from=build app/dist/stt-test /usr/share/nginx/html
COPY /etc/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
