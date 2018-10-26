const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCashe = opts.noCashe || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path, {
        noCache: noCashe,
        watch: watch,
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      });

  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f])
    }
  }
  return env;
}

var env = createEnv(__dirname + '/views', {
  watch: true,
  filters: {
    hex: function (n) {
      return '0x' + n.toString(16);
    }
  }
});

var s = env.render('hello.html', { name: 'Xiao Ming', header: 'Hello ...', body: 'bla bla bla...' });
console.log(s);
