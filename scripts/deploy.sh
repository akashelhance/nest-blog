#!/bin/bash

echo "Building the Docker image..."
./scripts/build-image.sh

echo "Running the Docker container..."
./scripts/run-container.sh

echo "Deployment complete. App is running on http://localhost:3000"
