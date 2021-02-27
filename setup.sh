#!/bin/bash
cp .env.example .env
docker-compose run --rm react sh -c "npm install"
docker-compose up -d
