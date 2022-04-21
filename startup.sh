MACHINE_IP=192.168.1.14

#
# API VARIABLES
#

# secrets
API_SECRET_KEY="django-insecure-v+j7xw$s&uv7*gcn=8c5al+v3t)&as&3^l)h(ywysj++2zg2w%"

# database
API_DATABASE_HOST=$MACHINE_IP
API_DATABASE_PORT=5432
API_DATABASE_NAME=popcorn_db
API_DATABASE_USER=django_api
API_DATABASE_PASS=midpMMk772xXh3

# environment
API_ENV=true

#
# UI VARIABLES
#

NEXT_PUBLIC_API_BASE_URL=http://$MACHINE_IP:4001
NEXT_PUBLIC_BASE_URL=https://$MACHINE_IP:3000


# DOCKER-COMPOSE

docker-compose up -d --build
