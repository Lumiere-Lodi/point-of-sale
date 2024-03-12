#!/bin/bash

set -e
set -u

set -a
source .env.development
set +a

envsubst < ./docker-compose.yml > 0-docker-compose.yml

docker-compose -f docker-compose.yml -f docker-compose.dev.yml -p munchpos up -d

rm -f 0-docker-compose.yml
