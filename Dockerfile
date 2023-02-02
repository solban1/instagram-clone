FROM node:current

RUN apt-get update; \
    apt-get install -y --no-install-recommends python3 python-is-python3 \
        python3-pip libpq5

WORKDIR /code
COPY requirements-dev.txt .
RUN pip install -r requirements-dev.txt

# ENTRYPOINT ["sh"]