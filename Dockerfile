FROM node:10-stretch

RUN apt-get update &&  \
    apt-get install -y git wget curl unzip ruby build-essential && \
    apt-get install -y ruby-dev && \
    gem install sass scss_lint && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg --unpack google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y && \
    apt-get clean && \
    rm google-chrome-stable_current_amd64.deb

# Font libraries
RUN apt-get -qqy install fonts-ipafont-gothic xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable libfreetype6 libfontconfig

RUN mkdir /code
WORKDIR /code
COPY . /code

RUN chown -R node:node /code
USER node
