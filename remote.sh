#!/usr/bin/env bash
IMAGE="labsurvey-visualization-2021"

(docker stop $IMAGE || true) && \
(docker rm $IMAGE || true) && \
docker run --init -d \
--restart=unless-stopped \
--log-opt max-size=16m --log-opt max-file=8 \
--name $IMAGE $IMAGE
