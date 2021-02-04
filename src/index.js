const Koa = require('koa');
const app = new Koa();
const smartGateWay = require('./middleware/smart-gateway')
const logger = plug('logger');

app.use(smartGateWay);

// response
app.use(ctx => {
  logger.debug('------------');
  ctx.body = `Hello ${ctx.userInfo.username}`;
});

module.exports = app;