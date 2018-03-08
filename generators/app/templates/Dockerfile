FROM mhart/alpine-node:8
WORKDIR /opt/app
ADD . /opt/app
RUN apk --update add git openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/* && \
    npm install && \
    npm install gulp-cli -g
CMD ["gulp","serve"]
