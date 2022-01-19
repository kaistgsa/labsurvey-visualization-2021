#!/usr/bin/env bash
IMAGE="labsurvey-visualization-2021"
REMOTE="${REMOTE:-gsa-alpha}"

docker save $IMAGE | lz4 | ssh $REMOTE "lz4 -dc | docker load" && \
cat remote.sh | ssh $REMOTE
