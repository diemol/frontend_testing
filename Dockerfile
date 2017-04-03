FROM node:7

RUN apt-get -qqy update \
  && apt-get -qqy install \
    git-core \
  && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/diemol/frontend_testing.git

RUN ln -sf /frontend_testing/page-objects/js-protractor/complete /js-protractor

WORKDIR /js-protractor
RUN npm install

CMD ["/usr/local/bin/npm", "test"]
