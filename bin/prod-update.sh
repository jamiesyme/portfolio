#! /bin/bash

# After using install-commands.sh
# Be sure $PWD is /opt/portfolio

git pull origin master

yarn install
mkdir -p build
yarn run build

pm2 stop node
(cd build && pm2 start node -- app.js)
