#!/bin/bash

if [ $1 = "Production" ]; then
    echo "Starting production deployment"
    source deploy/production.vars
else
    echo "Starting nightly deployment"
    source deploy/nightly.vars
fi

image_name=$2

docker stop $name || true && docker rm $name || true
docker run -d --name $name -p $port:3000 -e API_URL=api_url $image_name

echo "Finished deployment"
