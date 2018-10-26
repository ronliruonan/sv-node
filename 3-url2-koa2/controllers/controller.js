const fs = require('fs');

function addMapping(router, mappings) {
  for (var url in mappings) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mappings[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mappings[url]);
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

function addControllers(router, dir) {
  var files = fs.readdirSync(__dirname);
  var js_files = files.filter((f) => {
    return f.endsWith('.js')
  });
  for (var f of js_files) {
    console.log(`process controller **: ${f}...`)
    let mapping = require(__dirname + '/' + f)
    addMapping(router, mapping)
  }
}

module.exports = function (con_dir = 'controllers') {
  let router = require('koa-router')();
  addControllers(router, con_dir);
  return router.routes();
}
