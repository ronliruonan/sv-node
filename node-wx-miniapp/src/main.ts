import Koa, { ParameterizedContext } from 'koa';

const app = new Koa();
const router = require('koa-router')();
const bodyParse = require('koa-bodyparser');
const cors = require('koa2-cors');

app.use(cors());
app.use(bodyParse());
app.use(router.routes());
app.listen(6203, () => {
    console.log('ing', 6203)
});

router.get('/', async (ctx: ParameterizedContext) => {
    console.log(ctx.request);
    ctx.body = ctx.querystring;
});