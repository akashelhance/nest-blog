#!/bin/bash

# Stop any running container with the same name
docker stop nestjs-app || true
docker rm nestjs-app || true

# Run the Docker container
docker run -d -p 3000:3000 --name nestjs-app nestjs-app
