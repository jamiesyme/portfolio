#! /bin/bash

# After using install-commands.sh
# Be sure $PWD is /opt/portfolio

# This is required if this is run immediately after prod-install.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Get the website variables
[ -s "config/env.sh" ] && \. "config/env.sh"

git pull origin master

yarn install
mkdir -p build
yarn run build

pm2 stop node
(cd build && pm2 start node -- app.js)
