FROM node:10-alpine

WORKDIR /app

RUN yarn global add @vue/cli

COPY ./app/package.json ./
COPY ./app/yarn.lock ./

RUN yarn
