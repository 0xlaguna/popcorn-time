#!/bin/bash
# appyl migrations
python manage.py migrate

# collect statics
python manage.py collectstatic --noinput

# serve with gunicorn
gunicorn --bind 0.0.0.0:4001 popcorn_api.asgi -w 4 -k uvicorn.workers.UvicornWorker
