// url koa2 app.js
const Koa = require('koa')
// require(koa-router) 返回的是函数
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.url}...`);
    await next();
});
// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello, ${name}</h1>`;
});
router.get('/', async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>Index</h1>
    <form action="/sigin" method="post">
      <p>Name: <input name="name" value="koa2" /></p>
      <p>Pswd: <input name="password" type="password" /></p>
      <p><button> Submit </button></p>
    </form>`;
})
router.post('/sigin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`sigin with name:${name}, password:${password}`);
    if (name === 'koa2' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}</h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href='/'>Try agin</a></p>`;
    }
});

app.use(bodyParser());
// add router middleware
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...')
