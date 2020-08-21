const net = require('net');
const events = require('events');

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};



channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
    console.log('Has been connected');
});

channel.on('leave', function(id) {
    channel.removeListener(
        'broadcast', this.subscriptions[id]
    );
    channel.emit('broadcast', id, `${id} has left the chatroom`);
});

channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'The server has shut down\n');
    channel.removeAllListeners('broadcast');
});

channel.on('error', err => {
    console.log(`ERROR: ${err.message}`);
});


const server = net.createServer(clientSocket => {
    const id = `${clientSocket.remoteAddress}:${clientSocket.remotePort}`;
    channel.emit('join', id, clientSocket);

    clientSocket.on('data', data => {
        data = data.toString();
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        else if (data === "error") {
            channel.emit('error', new Error("ticki ticki tacki error"));
        }
        channel.emit('broadcast', id, data);
    });

    clientSocket.on('close', () => {
        channel.emit('leave', id);
    });
});
server.listen(3010);
