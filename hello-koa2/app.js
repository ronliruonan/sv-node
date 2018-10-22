// 导入koa，和koa1.x 不同，在koa2中，我们导入的是一个class，因此用大些的Koa表示
const Koa = require('koa');

// 创建一个Koa队形，表示web app本身
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ct.response.body = '<h1>Hello, koa2</h1>';
});

// 端口3000监听
app.listen(3000);
console.log('app started at port 3000...')

/**
 * ctx参数，是koa传入的封装了request和response的变量，我们可以通过它访问request和response，
 * next参数，是koa传入的将要处理的下一个异步函数
 * 上面的异步删除中，首先用await next(); 处理一下异步函数，然后再设置response的Content-type
 * 由async标记的函数 称为异步函数，在异步函数中，可以用await滴啊用另一个异步函数， es7的知识点
 * 
 */