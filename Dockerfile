FROM node:20-buster-slim

RUN apt-get update && \
    apt-get install -y \
        git \
        wget \
        build-essential \
        fonts-ipafont-gothic \
        xfonts-100dpi \
        xfonts-75dpi \
        xfonts-cyrillic \
        xfonts-scalable \
        libfreetype6 \
        libfontconfig \
        chromium && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /src/*.debnpm cache clean --force

ENV CHROME_BIN /usr/bin/chromium

WORKDIR /code
COPY . .

RUN adduser --uid 501 --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /code

USER appuser
