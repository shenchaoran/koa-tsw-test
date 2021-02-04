'use strict';

const config = require('./tsw.config');

// http监听地址
config.httpPort = 3000;

config.runAtThisCpu = [0];

// proxy
config.httpProxy = {
  ip: '127.0.0.1',
  port: 12639,
  enable: 1
};

// 开发者模式
config.devMode = true;

// logger
config.logger = {
  logLevel: { debug: 10, info: 20, warn: 30, error: 40, off: 50 }['warn']
};

module.exports = config;
