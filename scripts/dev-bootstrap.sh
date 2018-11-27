#!/usr/bin/env bash

# Use Ubuntu 18.04.1 LTS

# Install & configure NGINX
sudo apt-get update && apt-get install -y nginx
sudo ln -s /vagrant/config/nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -s reload
sudo systemctl disable nginx

# Setup serve folder
sudo ln -s /vagrant /srv/portfolio

# Install Node
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
echo 'PATH="$(yarn gobal bin):$PATH"' >> "$HOME/.profile"

# Copy the base api config
if [ ! -f /vagrant/config/api-env.json ]; then
    cp /vagrant/config/base-api-env.json /vagrant/config/api-env.json
fi

echo ""
echo "To run the website:"
echo " 1) vagrant ssh"
echo " 2) cd /vagrant"
echo " 3) yarn install"
echo " 4) yarn watch"
echo ""
echo "If you need to make use of the API server, run on a second connection:"
echo " 1) vagrant ssh"
echo " 2) cd /vagrant"
echo " 3) cat config/api-env.json"
echo " 4) node api-server.js"
echo ""
