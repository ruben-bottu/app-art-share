# app-art-share

## How to guides

These guides assume that you have Docker installed on your system.

### Get the backend up and running

```bash
cd backend/
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### Get the frontend up and running

Install [docker-ember](https://github.com/madnificent/docker-ember)

```bash
cd frontend/
ed npm install
eds --proxy http://host
```

## Checkbox

The mu-semtech trainer project checkbox:

-   [x] has an app-art-share mu-project
-   [x] has a frontend-art-share frontend in EmberJS
-   [x] uses ember-data in the frontend
-   [x] uses omnipresent microservices:
    -   [x] identifier
    -   [x] dispatcher
    -   [x] resource
    -   [x] mu-authorization
    -   [x] virtuoso
    -   [x] migrations
-   [x] includes at least one custom microservice
-   [x] uses mu-cl-resources for generic API
-   [x] uses migrations-service for seed data
-   [x] includes docker-compose.yml that could be used as production setup
-   [x] includes docker-compose.dev.yml for development overrides (eg: publish port 80 of identifier, 8890 of Virtuoso)
-   [ ] has woodpecker builds for the frontend and custom services
