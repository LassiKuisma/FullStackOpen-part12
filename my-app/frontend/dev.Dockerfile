FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

CMD npm run web
