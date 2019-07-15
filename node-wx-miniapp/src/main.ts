import Koa, { ParameterizedContext } from 'koa';

const app = new Koa();
const router = require('koa-router')();
const bodyParse = require('koa-bodyparser');
const cors = require('koa2-cors');

app.use(cors());
app.use(bodyParse());
app.use(router.routes());
app.listen(6204, () => {
    console.log('ing', 6204)
});

router.get('/', async (ctx: ParameterizedContext) => {
    const sb = /(^|&)echostr=([^&]*)(&|$)/g.exec(ctx.querystring)[2];
    console.log(sb);
    ctx.body = sb;
});