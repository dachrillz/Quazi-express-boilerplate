#!/bin/bash
PROJECT=$1

docker container rm $PROJECT 

docker run -d \
    --network host \
    --name $PROJECT \
    -v /home/chrille/crypto-config:/config/crypto-config \
    pharma-prototype/$PROJECT:latest
