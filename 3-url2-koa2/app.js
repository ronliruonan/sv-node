
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.url}...`);
  await next();
});

const controller = require('./controllers/controller');
app.use(controller());
app.listen(3000)
console.log('process start at port 3000')
