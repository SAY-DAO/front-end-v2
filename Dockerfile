FROM node:16-slim as base
RUN apt-get update && apt-get install -y \
    git gcc python3 build-essential bzip2

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base as source
COPY --chown=node:node . .

FROM source as build
ARG ENVIRONMENT=prod
RUN yarn run build

FROM nginx:stable-alpine as runtime
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]