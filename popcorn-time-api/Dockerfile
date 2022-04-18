FROM python:3.9-slim-buster AS poetry
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml poetry.lock ./
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
RUN pip install -r requirements.txt
COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:4001", "popcorn_api.config.asgi", "-w", "4", "-k", "uvicorn.workers.UvicornWorker"]

# development only
# CMD ["./popcorn_api/manage.py", "runserver", "0.0.0.0:4001"]
