#!/usr/bin/env bash

# Use Ubuntu 16.04.3 LTS

# SSL Certs expected for NGINX:
#   /opt/ssl/jamiesyme.com.pem
#   /opt/ssl/jamiesyme.com.key
# These files originate from CloudFlare.

# UFW is used to block all ports except SSH, HTTP, and HTTPS
sudo apt-get install -y ufw
sudo ufw default deny
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw --force enable

# Install & configure NGINX
sudo apt-get install -y nginx
sudo ln -s $(realpath config/nginx-prod.conf) /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-evailable/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -s reload

# Setup serve folder
sudo ln -s $(realpath .) /srv/portfolio

# Install Node
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
echo 'PATH="$(yarn gobal bin):$PATH"' >> "$HOME/.profile"

# Install PM2
yarn global add pm2

echo "Run the following command to complete the bootstrapping process, or restart your ssh connection:"
echo ". ~/.profile"
