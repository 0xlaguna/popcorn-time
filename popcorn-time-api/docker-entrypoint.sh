#!/bin/bash

# appyl migrations
python manage.py migrate

# serve with gunicorn
gunicorn --bind 0.0.0.0:4001 popcorn_api.asgi -w 4 -k uvicorn.workers.UvicornWorker
