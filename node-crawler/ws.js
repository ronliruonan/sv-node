/**
 * WebSocket Server
 */
const WebSocketServer = require('websocket').server;
const http = require('http');
let connectionCount = 0;

//1. 创建http服务
const httpServer = http.createServer((request, response) => {
    response.writeHead(404);
    response.end();
});

httpServer.listen(6203, () => {
    console.log('服务端监听 6203')
});

// 2. 创建ws服务
const wsServer = new WebSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});
console.log('开玩笑呢吧？');


// 3. 通讯逻辑，监听ws request
wsServer.on('request', request => {
    // request is the webSockectRequest object
    // 1. 校验请求源
    function originIsAllowed(request) {
        console.log('捣乱的origin: ', request.origin);
        return true;
    }

    if (!originIsAllowed(request)) {
        request.reject();
        console.log('非法Origin：' + request.origin);
        return;
    }

    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\');
    console.log(request.origin);
    console.log(request.accept);
    console.log('----------------------------------------------------')
    // 2. 接头暗号
    const connection = request.accept(null, request.origin);

    // 3. 监听ws message
    connection.on('message', msg => {
        if (msg.type === 'utf8') {
            console.log('utf8:', new Date().toLocaleString(), msg.utf8Data);
        } else if (msg.type === 'binary') {
            console.log('binary(bytes):', new Date().toLocaleString(), msg.binaryData.length.length);
        }
    });
    // 4. 监听close
    connection.on('close', (reasonCode, descriptoin) => {
        console.log('close ' + connection.remoteAddress + ' disconnected')
    });

    // 5. 发送消息
    async function showTime() {
        if (connectionCount === 0) return console.log(0);

        const { out } = require('./controller/crawler-file');

        const res = await out();

        if (!connection.connected) return;
        connection.sendUTF(JSON.stringify(res));
        setTimeout(showTime, 1000 * 2);

    }
    showTime();
});

wsServer.on('connect', function () {
    console.log('connect', ++connectionCount)
});
wsServer.on('close', function () {
    console.log('close', --connectionCount)
});
