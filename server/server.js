const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3300
let app = express();
let server = http.createServer(app)
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave(params.room)

        // io.emit -> this is sent to everyone => io.to(params.room).emit
        // socket.broadcast.emit -> this is sent to everyone except the sender => socket.broadcast.to(params.room).emit
        // socket.emit -> this is sent to only one user
        socket.emit('newMessage',  generateMessage ("admin", "welcome to chat app"));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("admin", `${params.name} joined`));
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('clientLocation', (coords, callback) => {
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('serverSendLocation', generateLocation(user.name, coords.latitude, coords.longitude));
        }
        callback(true);
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("admin", `${user.name} left the chat`));
        }
        users.removeUser(socket.id);
    });
});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});