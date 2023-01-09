FROM node:16-alpine

ENV PORT 3000

WORKDIR /app

ADD package.json .
ADD yarn.lock .

RUN yarn

ADD . .

RUN yarn build
CMD yarn start

EXPOSE $PORT
