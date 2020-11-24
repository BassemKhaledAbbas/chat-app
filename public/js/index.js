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

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (status) {
        console.log({status})
    });
});