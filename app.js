/* importar as configurações do servidor */
let app = require('./config/server');

/* parametrizar porta de escuta */
let server = app.listen(8080, function(){
    console.log('Servidor online porta 8080');
});

let io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexão pro websocket */
io.on('connection', function(socket) {
    console.log('usuario conectou');

    socket.on('disconnect', function() {
        console.log('usuario desconectado');
    });

    socket.on('msgToServer', function(data) {
        /* dialog */
        socket.emit('msgToClient', {nickname: data.nickname, msg: data.msg});

        socket.broadcast.emit('msgToClient', {nickname: data.nickname, msg: data.msg});

        /* participants */
        if (parseInt(data.nicknameUpdated) == 0) {
            socket.emit('participantsToClient', {nickname: data.nickname});
    
            socket.broadcast.emit('participantsToClient', {nickname: data.nickname});
        }
    });
});