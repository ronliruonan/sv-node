import Koa from 'koa';

const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
// const cors = require('koa2-cors')

app.use(bodyParser());
app.use(router.routes());
app.listen(6203, () => {
    console.log(`【DEMO】 is starting at port 6203`);
});

app.use(async (ctx, next) => {
    console.log('----------');
    console.log(`[url] ${ctx.request.url}`);
    console.log(`[method] ${ctx.request.method}`);
    console.log('----------');

    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`-----时间线-----Time: ${ms}ms---`);
});

router.get('/', async (ctx, next) => {
    ctx.body = { 'Hello': 'World!' };
});
