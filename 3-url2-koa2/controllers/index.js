var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
    <form action="/sigin" method="post">
      <p>Name: <input name="name" value="koa2" /></p>
      <p>Pswd: <input name="password" type="password" /></p>
      <p><button> Submit </button></p>
    </form>`;
}

var fn_sigin = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`sigin with name:${name}, password:${password}`);
    if (name === 'koa2' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}</h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
    <p><a href='/'>Try agin</a></p>`;
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /sigin': fn_sigin
}