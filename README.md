# My Portfolio

Deployed at [jamiesyme.com](https://jamiesyme.com).


## Local Dev

1. `yarn install`
2. `yarn run build | build-client | build-server`
3. `cp config/base-env.sh config/env.sh` and edit
4. Source the env: `. config/env.sh`
5. Run server: `yarn run start`
6. View in browser: `http://localhost:8080`


## Deploying

1. Setup SSH cert settings (see comments in `bin/prod-install.sh`)
2. Clone repo & cd
3. `cp config/base-env.json config/env.json` and edit
4. `bin/prod-install.sh`
5. `bin/prod-update.sh`

After this, `bin/prod-update.sh` can be used to update.

Note: the app will not start automatically on startup.
