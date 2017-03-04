#! /bin/bash

# Using Ubuntu 16.04.2 LTS

# Done before this script:
#   apt-get update && apt-get install -y git
#   git clone https://github.com/jamiesyme/portfolio.git /opt/portfolio
#   cd /opt/portfolio

# Ufw is used to block all ports except SSH, HTTP, and HTTPS
apt-get install -y ufw
ufw default deny
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Nginx is used as a proxy for our server
# It also handles HTTPS for us
apt-get install -y nginx
cp config/nginx.conf /etc/nginx/sites-available/jamiesyme.com
ln -s /etc/nginx/sites-available/jamiesyme.com /etc/nginx/sites-enabled/jamiesyme.com

# NOTE: Nginx expects to find the following files:
#  /opt/ssl/jamiesyme.com.pem
#  /opt/ssl/jamiesyme.com.key
# You can retrieve these files from CloudFlare

# NVM will manage Node for us
apt-get install -y build-essential libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
source ~/.profile
nvm install node

# Yarn is used to install our dependencies
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get update
apt-get install -y yarn

# Install PM2
yarn global add pm2
