FROM node:13.12.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm ci --silent

RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN apt-get -y update && apt-get install -y dos2unix
COPY entrypoint.sh ./entrypoint.sh
RUN dos2unix ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]