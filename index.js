const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const mongoDB= require('./utility/mongoDB');
//const jwtKoa = require('koa-jwt');
//const jwtUtil = require('./utility/jwt');
const app = new Koa();

app.use(bodyParser());

app.use(async(ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200
  }
  await next();
});


app.use(router.routes());

app.listen(80);
