const crypto = require('crypto')

function sha256(string) {
  let hash = crypto.createHash('sha256')
  hash.update(string)
  return hash.digest('hex') // 返回16进制hash码
}


module.exports = async function smartGateWay(ctx, next) {
  const req = ctx.request;
  // 非生产环境直接放行
  if (process.env.NODE_ENV === 'development') {
    const username = ctx.cookies.get('t_uid') || ''
    ctx.userInfo = {
      username,
    };
    return next();
  }
  console.log('ENV: ');
  console.log(process.env);
  // 正式域名和测试域名有不同的token
  const token = process.env.OA_TOKEN || '';
  const timestamp = req.header['timestamp']
  const signature = req.header['signature']
  const staffId = req.header['staffid']
  const staffName = req.header['staffname']
  const xRioSeq = req.header['x-rio-seq']
  const xExtData = req.header['x-ext-data'] || '' // 办公网访问，这里要设置成空字符串

  const nowTimestamp = Math.floor(new Date().getTime() / 1000);

  // 校验时间戳,误差不得超过180秒
  if (Math.abs(nowTimestamp - timestamp) > 180) {
    // 可在此添加写日志操作
    console.log(`smart-proxy timestamp check fail, nowTimestamp: ${nowTimestamp}, timestamp: ${timestamp}`)
    ctx.body = 'smart-proxy timestamp check fail'
    return
  }

  // 签名为大写英文
  const computedSignature = sha256(`${timestamp}${token}${xRioSeq},${staffId},${staffName},${xExtData}${timestamp}`).toUpperCase()

  // 校验签名
  if (computedSignature !== signature) {
    // 可在此添加写日志操作
    console.log(`smart-proxy signature check fail, before signature string: ${timestamp}${token}${xRioSeq},${staffId},${staffName},${xExtData}${timestamp}`);
    ctx.body = 'smart-proxy signature check fail';
    return;
  }
  ctx.userInfo = {
    username: staffName,
  };
  // 合法用户正常放行
  return next();
};