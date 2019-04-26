/**
 * WebSocket Client
 */

const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

client.on('connectFailed', err => {
    console.log(`客户端连接失败[${new Date().toLocaleString()}]: `, err.message);
});

client.on('connect', connection => {
    console.log(`客户端连接成功[${new Date().toLocaleString()}]`);

    connection.on('error', err => {
        console.log(`客户端连接失败[${new Date().toLocaleString()}]: `, err.message);
    })
    connection.on('close', () => {
        console.log(`echo-protocol 连接关闭[${new Date().toLocaleString()}]`)
    })
    connection.on('message', msg => {
        if (msg.type === 'utf8') {
            console.log(`客户端接收${new Date().toLocaleString()}: `, msg.utf8Data)
        }
    })

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000 * 2);
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080', 'echo-protocol')