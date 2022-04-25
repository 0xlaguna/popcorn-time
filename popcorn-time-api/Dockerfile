FROM python:3.9-slim-buster AS poetry
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml poetry.lock docker-entrypoint.sh ./
RUN poetry export -f requirements.txt --output requirements.txt

FROM python:3.9-slim-buster
# runtime dependencies
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    libpq-dev \
    build-essential \
    ;


WORKDIR /app
COPY --from=poetry /app/requirements.txt .
COPY --from=poetry /app/docker-entrypoint.sh .
RUN pip install -r requirements.txt
COPY . .

COPY docker-entrypoint.sh /app/popcorn_api

RUN chmod +x /app/popcorn_api/docker-entrypoint.sh

ENTRYPOINT /app/popcorn_api/docker-entrypoint.sh

WORKDIR /app/popcorn_api

# CMD ["gunicorn", "--bind", "0.0.0.0:4001", "popcorn_api.asgi", "-w", "4", "-k", "uvicorn.workers.UvicornWorker"]

# development only
# CMD ["./popcorn_api/manage.py", "runserver", "0.0.0.0:4001"]
