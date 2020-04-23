const express = require('express');

// Seridor hpttp por defecto en node para integración de sockets
const http = require('http');

const path = require('path');

const app = express();


// Creando servidor de producción
let server = http.createServer(app);

// SOCKETS.IO
const socketIO = require('socket.io');

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Inicializando sockets.io
// IO = está es la comunicación directa del backend
let io = socketIO(server);

// Para saber cuando un usario se conecta al server
// client tiene toda la información de la computadora o de la conexión que se establecio
io.on('connection', (client) => {

    console.log('Usuario conectado');


    // Detectando desconexión del usuario
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //  Esuchar al cliente (La información enviada desde el frontEnd) (enviarMensaje es el mismo nombre que se envio del frontEnd)
    // Solo comunicación de uno a uno
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log(mensaje);


        // Retroalimentación si todo salió bien
        if (mensaje.usuario) {
            callback({
                resp: 'Todo salió bien!'
            });
        } else {
            callback({
                resp: 'TODO SALIÓ MAL!!'
            });
        }

        // Retroalimentación si todo salió bien
        // callback();

    });

    // Enviando mensaje al cliente
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });


});

// Escuchando servidor
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});