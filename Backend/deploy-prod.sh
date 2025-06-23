#!/bin/bash
set -e

# Navigate to project directory
# cd /path/to/your/project

# Stop existing containers
docker-compose -f docker-compose.prod.yml down

# Pull the latest changes (if using git)
# git pull origin main

# Build and start containers
docker-compose -f docker-compose.prod.yml up -d --build

# Verify containers are running
docker ps

echo "Deployment completed successfully!"