#! /bin/bash

# After using prod_install.sh
# Be sure $PWD is /opt/portfolio

# This is required if this is run immediately after prod-install.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

git pull origin master

yarn install
mkdir -p build
yarn run build

pm2 stop node
pm2 start config/env.json
