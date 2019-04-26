/**
 * WebSocket Server
 */
const WebSocketServer = require('websocket').server;
const http = require('http');

var server = http.createServer((req, res) => {
    res.writeHead(404);
    res.end();
});
server.listen(8080, () => {
    console.log('服务端监听 8080')
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    return true;
}
wsServer.on('request', request => {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log('Connection form origin' + request.origin);
        return;
    }

    const connection = request.accept('echo-protocol', request.origin);
    console.log('服务端接收成功', new Date().toLocaleString());
    // connection.on('message', msg => {
    //     if (msg.type === 'utf8') {

    //         console.log(`Server utf8 [${new Date().toLocaleString()}]:`, msg.utf8Data);


    //         connection.sendUTF(msg.utf8Data + '  right？');
    //     } else if (msg.type === 'binary') {
    //         console.log(`Server Binary [${new Date().toLocaleString()}]:${msg.binaryData.length} bytes`)
    //         connection.sendBytes(msg.binaryData);
    //     }
    // });
    connection.on('close', (reasonCode, descriptoin) => {
        console.log('Peer ' + connection.remoteAddress + ' disconnected')
    })

    function sendRandom() {
        if (connection.connected) {
            connection.sendUTF(Math.random());
            setTimeout(sendRandom, 1000 * 2)
        }
    }
    sendRandom();
})
