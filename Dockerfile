FROM node:16.13.1

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . ./

RUN yarn run build
RUN yarn global add serve

ENV NODE_ENV=production

CMD ["serve","-s","build"]