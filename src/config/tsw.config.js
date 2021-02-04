'use strict';

if (global.window) {
  global.window.disable();
}

module.exports = {
  httpPort: 80,
  appid: 'tsw1777',
  appkey: 'PNDsTwkD4dzDQrxzkJcsy3hA',
  workerUid: 'root',
  modAct: {
    getModAct(req) {
      return req.REQUEST.pathname;
    }
  },
  // 模块映射
  modMap: {
    find(modAct, req, res) {
      return require(process.env['APP_ENTRY']);
    }
  },
  extendMod: {
    getUin(request) {
        const req = request;
        return (
            req.cookies.t_uid
            || req.cookies.km_uid
            || req.cookies.user_name
            || req.headers.staffname
        );
    },
  },
};
