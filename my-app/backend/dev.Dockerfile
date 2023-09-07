FROM node:16

WORKDIR /usr/src/app

# sqlite needs write permissions for the parent folder to write temp files
RUN chown node .
COPY --chown=node:node . .

RUN npm install

USER node

RUN npm run build
RUN npm run seed:run

CMD npm run start:dev
