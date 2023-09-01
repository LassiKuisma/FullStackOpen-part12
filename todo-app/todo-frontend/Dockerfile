FROM node:16 AS build-stage
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM build-stage as test-stage

RUN npm ci
COPY . .

ENV CI=true
RUN npm test

FROM nginx:1.20-alpine

COPY --from=test-stage /usr/src/app/build /usr/share/nginx/html
