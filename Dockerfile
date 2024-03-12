FROM node:18.16.0-alpine as common-build-stage

COPY . ./app

WORKDIR /app

EXPOSE 5000

ENV NODE_ENV development

RUN npm install

RUN npm run build

CMD npm run serve
