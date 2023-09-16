FROM node:16 AS build-stage

WORKDIR /usr/src/app
COPY . .
RUN npm ci --legacy-peer-deps

FROM build-stage AS test-stage

RUN npm ci --legacy-peer-deps
COPY . .
RUN npm test

FROM node:16

WORKDIR /usr/src/app
COPY --from=test-stage /usr/src/app /usr/src/app
CMD npm run web
