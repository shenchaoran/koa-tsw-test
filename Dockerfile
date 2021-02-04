FROM csighub.tencentyun.com/tsw/tsw:1.0.1882
WORKDIR /data/release/node_modules/
COPY ./ ./chestershen/

ENV TSW_CONFIG_PATH /data/release/node_modules/chestershen/src/config/tsw.config.js
ENV APP_ENTRY /data/release/node_modules/chestershen/src/index.js
ENV NODE_ENV development

RUN /usr/local/services/TSW-1.0/bin/proxy/startup.sh

EXPOSE 80