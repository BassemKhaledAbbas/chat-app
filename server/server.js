const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
let {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3300
let app = express();
let server = http.createServer(app)
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage',  generateMessage ("admin", "welcome to chat app"));

    socket.broadcast.emit('newMessage', generateMessage("admin", "new user Joined"));

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(true);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('newMessage', generateMessage("admin", "user disconnected"));
    });
});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});