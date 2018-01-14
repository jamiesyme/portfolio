#!/usr/bin/env bash

git pull origin master

yarn install
rm -rf dist
yarn build

pm2 stop 'api server'
pm2 start config/api-env.json
