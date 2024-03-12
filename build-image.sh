#!/bin/bash
TAG_NAME=${1:-latest}
docker build -t munchpos/server:$TAG_NAME .
