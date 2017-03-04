# My Portfolio

Deployed at jamiesyme.com

## Building

Install npm modules: `yarn install`

Build: `yarn run build | build-client | build-server`


## Running Server

Run: `yarn run start`


## View in Browser

Visit: `localhost:8080`


## Deploying

1) Setup SSH cert settings (see comments `bin/prod-install.sh`)
2) Clone repo & cd
3) `bin/prod-install.sh`
4) `bin/prod-update.sh`

After this, `bin/prod-update.sh` can be called to update.

Note: the app will not start automatically on startup.
