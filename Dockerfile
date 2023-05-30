FROM node:16-alpine

EXPOSE ${PORT}

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod

CMD ["yarn", "deploy"]