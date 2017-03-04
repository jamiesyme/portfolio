# My Portfolio

Deployed at [jamiesyme.com](https://jamiesyme.com).

## Building

Install npm modules: `yarn install`

Build: `yarn run build | build-client | build-server`


## Running Server

Run: `yarn run start`


## View in Browser

Visit: `localhost:8080`


## Deploying

1. Setup SSH cert settings (see comments in `bin/prod-install.sh`)
2. Clone repo & cd
3. `bin/prod-install.sh`
4. `bin/prod-update.sh`

After this, `bin/prod-update.sh` can be used to update.

Note: the app will not start automatically on startup.
