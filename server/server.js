const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3300
let app = express();
let server = http.createServer(app)
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'john',
        text: 'testing data',
        createdAt: Date.now()
    });

    socket.on('createMessage', (message) => {
        console.log('create message', message);
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
});


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});