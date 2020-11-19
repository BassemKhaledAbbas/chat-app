var socket = io();

socket.on('connect', function () {
    console.log('connected to the server');

    // socket.emit('createMessage', {
    //     from: 'Andy',
    //     text: 'test message'

    // });
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('newMessage', function (message) {
    console.log('new message', message);
});