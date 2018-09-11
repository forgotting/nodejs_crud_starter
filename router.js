const Router = require('koa-router');
const user = require('./routes/user');
const jwtKoa = require('koa-jwt')
const jwtConfig = require('./config/default.json').jwt;
//const jwtUtil = require('./utility/jwt');
const router = Router();
//const { getUser } = require('./service/userAccountService')

router.use(function (ctx, next) {
    return next().catch(async(err) => {
      if (err.status === 401) {
        //let token = ctx.header.authorization.split(' ')[1];
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
          //refreshToken: await jwtUtil.tokenRefresh(token)
        };
      } else {
        throw err;
      }
    });
});

//執行這段程式碼時即作jwt驗證(是否存在、有效性、時效性)
router.use(jwtKoa({secret : jwtConfig.secret}).unless({
    path: [/^\/users\/login/]
    //path: [/^\/users\/login/, /^\/users\//] //符合路徑的api不做jwt驗證
}));



router.use('', user.routes());
module.exports = router;
