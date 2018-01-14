# Portfolio

## Production

Initial setup:

```bash
# Ubuntu Server 16.04.3 LTS
# First, setup SSH certs (see comments in `scripts/prod-bootstrap.sh`)
scripts/prod-bootstrap.sh
scripts/prod-update.sh
```

After this, `scripts/prod-update.sh` can be used to update.