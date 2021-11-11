#!/bin/bash

set -e

docker pull $BASE_IMAGE || true
docker pull $CONTAINER_IMAGE || true

docker build \
    --build-arg REACT_APP_NODE_ENV=$ENVIRONMENT \
    --cache-from $BASE_IMAGE \
    --cache-from $CONTAINER_IMAGE \
    --target base \
    -t $BASE_IMAGE \
    .

docker build \
    --build-arg REACT_APP_NODE_ENV=$ENVIRONMENT \
    --cache-from $BASE_IMAGE \
    --cache-from $CONTAINER_IMAGE \
    --target runtime \
    -t $CONTAINER_IMAGE \
    .
