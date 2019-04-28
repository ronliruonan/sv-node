Node Typescript 项目，用于sso中间层
==================================

已知问题
----------
1. 使用Axios调用其他Java接口（一下成为JavaAPI）时，经常timeout；但是单独压测接JavaAPI时，不会存在10s的过期
```
Code火箭接收失败
{ Error: timeout of 10000ms exceeded
    at createError (/home/app/publish/node/node-sso/node_modules/axios/lib/core/createError.js:16:15)
    at Timeout.handleRequestTimeout [as _onTimeout] (/home/app/publish/node/node-sso/node_modules/axios/lib/adapters/http.js:216:16)
    at ontimeout (timers.js:436:11)
    at tryOnTimeout (timers.js:300:5)
    at listOnTimeout (timers.js:263:5)
    at Timer.processTimers (timers.js:223:10)
  config:
   { adapter: [Function: httpAdapter],
     transformRequest: { '0': [Function: transformRequest] },
     transformResponse: { '0': [Function: transformResponse] },
     timeout: 10000,
     xsrfCookieName: 'XSRF-TOKEN',
     xsrfHeaderName: 'X-XSRF-TOKEN',
     maxContentLength: -1,
     validateStatus: [Function: validateStatus],
     headers:
      { Accept: 'application/json, text/plain, */*',
        'User-Agent': 'axios/0.18.0' },
     method: 'get',
     url:
      'http://xxx/javaapi/xiangxiaoqiang001',
     data: undefined },
  code: 'ECONNABORTED',
  request:
   Writable {
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: true,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: true,
        bufferedRequestCount: 0,
        corkedRequestsFree: [Object] },
     writable: true,
     _events:
      [Object: null prototype] {
        response: [Function: handleResponse],
        error: [Function: handleRequestError] },
     _eventsCount: 2,
     _maxListeners: undefined,
     _options:
      { maxRedirects: 21,
        maxBodyLength: 10485760,
        protocol: 'http:',
        path:
         '/javaapi/xiangxiaoqiang001',
        method: 'get',
        headers: [Object],
        agent: undefined,
        auth: undefined,
        hostname: 'xxx',
        port: '7000',
        nativeProtocols: [Object],
        pathname:
         '/javaapi/xiangxiaoqiang001' },
     _ended: true,
     _ending: true,
     _redirectCount: 0,
     _redirects: [],
     _requestBodyLength: 0,
     _requestBodyBuffers: [],
     _onNativeResponse: [Function],
     _currentRequest:
      ClientRequest {
        _events: [Object],
        _eventsCount: 6,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: true,
        chunkedEncoding: false,
        shouldKeepAlive: false,
        useChunkedEncodingByDefault: false,
        sendDate: false,
        _removedConnection: false,
        _removedContLen: false,
        _removedTE: false,
        _contentLength: 0,
        _hasBody: true,
        _trailer: '',
        finished: true,
        _headerSent: true,
        socket: [Socket],
        connection: [Socket],
        _header:
         'GET /javaapi/xiangxiaoqiang001 HTTP/1.1\r\nAccept: application/json, text/plain, */*\r\nUser-Agent: axios/0.18.0\r\nHost: xxxx:7000\r\nConnection: close\r\n\r\n',
        _onPendingData: [Function: noopPendingOutput],
        agent: [Agent],
        socketPath: undefined,
        timeout: undefined,
        method: 'GET',
        path:
         '/javaapi/xiangxiaoqiang001',
        _ended: false,
        res: null,
        aborted: 1556268661316,
        timeoutCb: null,
        upgradeOrConnect: false,
        parser: [HTTPParser],
        maxHeadersCount: null,
        _redirectable: [Circular],
        [Symbol(isCorked)]: false,
        [Symbol(outHeadersKey)]: [Object] },
     _currentUrl:
      'http://xxx/javaapi/xiangxiaoqiang001' },
  response: undefined }
```
2. Axios调用JavaAPI时，会有一个。。。

技术点
----------
1. nodemon 自动监听文件变化，开发阶段方便 (没有使用)
2. ts-node-dev 自动监听文件变化，开发阶段方便 （项目中使用）
3. gulp 拷贝文件夹
4. cross-env 部署动态带入process.env.NODE_ENV
5. tsc
6. koa2，koa2-cors，koa-bodyparser，koa-router
7. axios
8. jsonwebtoken 中间件

优化点
----------
1. axios 统一设置timeout，以免长时间占用

to do
----------
1. 尾递归优化