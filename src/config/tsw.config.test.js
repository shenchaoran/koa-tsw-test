'use strict';

const config = require('./tsw.config');

// 是否测试环境
config.isTest = true;
// http监听地址 
config.httpAddress = '0.0.0.0';
// 是否自动清理缓存
config.autoCleanCache = true;
// http监听地址
config.httpPort = 8081;

// logger
config.logger = {
    logLevel: 'debug'
};

config.timeout = {
    closeWorker: 10000,
    socket: 120000,
    post: 300000,
    get: 1000000,
    keepAlive: 10000,
    dns: 1000
};

const serverInfo = plug('serverInfo');
const testInfo = {
    '9.134.237.236': {
        name: '普通业务功能测试使用',
        desc: '普通业务功能测试使用',
        order: 1,
        owner: 'chestershen',
    }
};
config.testInfo = testInfo[serverInfo.intranetIp];

module.exports = config;
