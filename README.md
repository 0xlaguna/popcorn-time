## Structure

| Codebase               |   Description    |
| :--------------------- | :--------------: |
| [popcorn-time-ui](API) |    Django API    |
| [popcorn-time-ui](UI)  | Next.js frontend |

## Branches

- develop -> pull request this branch for everything

### Devcontainer full local development

- In progress

### Manual full local development

## Backend

- Install postgresql, create a database (ex: popcorn_db)
- Python 3.9, recommended to use [Pyenv](https://github.com/pyenv/pyenv)
- [Poetry](https://python-poetry.org/)

Navigate to popcorn-time-api/
Install dependencies

```sh
poetry install
```

Navigate to popcorn-time-api/popcorn_api/popcorn_api
create a .env file

```text
# secrets
API_SECRET_KEY=gcc_example_insecure_secret4

# database
API_DATABASE_HOST=localhost
API_DATABASE_PORT=5432
API_DATABASE_NAME=popcorn_db
API_DATABASE_USER=postgres
API_DATABASE_PASS=password_example
```

Navigate to popcorn-time-api/
Apply migrations

```sh
poetry run python ./popcorn_api/manage.py migrate
```

Create a django superuser

```sh
poetry run python ./popcorn_api/manage.py createsuperuser
```

## Frontend

- [Node-LTS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) as package manager (make sure to install it globally)
- Recommended to use NVM

Navigate to popcorn-time-ui/

Install dependencies

```sh
yarn install
```

Create a file .env.development.local

```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
NEXT_PUBLIC_BASE_URL=https://localhost:3000
```

## [PM2](https://pm2.keymetrics.io/) as process manager

install pm2

```sh
npm install pm2 -g
```

Navigate to the foot folder

```sh
pm2 monit
```

Open a new terminal/tab

```sh
pm2 start
```

this will run both frontend and backend as described in ./ecosystem.config.js

## Running containers locally

docker-compose -f docker-compose.dev.yml up -d --build

- this docker compose file, contains an postgresql instance, and nginx for django static file serving

## Deployment

There is a CI/CD pipeline that deploys the containers to AWS ec2, tested with AWS fargate tho. Right now its broken. So we're living on heroku dynos for now. Our database runs on AWS RDS - Aurora

## Technical considerations
