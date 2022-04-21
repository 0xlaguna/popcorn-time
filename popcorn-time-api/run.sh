# install dependencies

poetry install

# run django server - development only

poetry run python ./popcorn_api/manage.py runserver 0.0.0.0:$PORT
