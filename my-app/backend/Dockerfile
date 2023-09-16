FROM node:16

WORKDIR /usr/src/app

# sqlite needs write permissions for the parent folder to write temp files
RUN chown node .
COPY --chown=node:node . .

RUN npm ci --only=production

USER node

RUN npm run build

CMD npm run start
