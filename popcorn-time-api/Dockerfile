FROM python:3.9-slim-buster AS poetry
RUN pip install poetry
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN poetry export -f requirements.txt --output requirements.txt

FROM python:3.9-slim-buster
WORKDIR /app
COPY --from=poetry /app/requirements.txt .
RUN pip install -r requirements.txt
COPY . .

CMD ["./popcorn_api/manage.py", "runserver", "0.0.0.0:4001"]
