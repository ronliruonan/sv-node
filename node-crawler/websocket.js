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

// 3. 通讯逻辑，监听ws request
wsServer.on('request', request => {
    // 1. 校验请求源
    function originIsAllowed(request) {
        console.log('origin: ', request.origin);
        return true;
    }
    console.log('001')
    if (!originIsAllowed(request)) {
        request.reject();
        console.log('非法Origin：' + request.origin);
        return;
    }

    console.log('002')
    // 2. 接头暗号
    const connection = request.accept();
    console.log('003')
    // 3. 监听ws message
    connection.on('message', msg => {
        if (msg.type === 'utf8') {
            console.log(`Server utf8 [${new Date().toLocaleString()}]:`, msg.utf8Data);
        } else if (msg.type === 'binary') {
            console.log(`Server Binary [${new Date().toLocaleString()}]:${msg.binaryData.length} bytes`)
        }
    });
    // 4. 监听close
    connection.on('close', (reasonCode, descriptoin) => {
        console.log('Peer ' + connection.remoteAddress + ' disconnected')
    });

    // 5. 发送消息
    async function showTime() {
        if (connectionCount === 0) return console.log(0);
        const wsapi = require('./api/websocket');
        const res = await wsapi.show();

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
