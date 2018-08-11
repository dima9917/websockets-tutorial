var express = require("express");
var socket = require("socket.io");
//App setup
var app = express();
var server = app.listen(4000, () => {
    console.log("listening on port 4000");
});

//static files
app.use(express.static("public"));

//Socket setup
var io = socket(server);

io.on("connection", socket => {
    console.log("made socket connection ", socket.id);
    console.log('active users: ', Object.keys(io.sockets.sockets).length);

    socket.on('chat', (data) => {
        if (data.message == 'fuck') {
            io.sockets.emit('chat', {
                handle: 'bot',
                message: `HEY! You are done! (${data.handle} has been kicked out`
            })
            socket.disconnect();
            console.log(`${data.handle} has been kicked out`);


        } else {
            io.sockets.emit('chat', data)
            console.log(`emitting--> handle: ${data.handle}, message: ${data.message}`);

        }
        console.log('active users: ', Object.keys(io.sockets.sockets).length);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});