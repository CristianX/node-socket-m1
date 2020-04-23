// Importando socket io
const { io } = require('../server');

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
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);


        // Broadcast a todos los usuarios
        client.broadcast.emit('enviarMensaje', data);


        // Retroalimentación si todo salió bien
        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'Todo salió bien!'
        //     });
        // } else {
        //     callback({
        //         resp: 'TODO SALIÓ MAL!!'
        //     });
        // }

        // Retroalimentación si todo salió bien
        // callback();

    });

    // Enviando mensaje al cliente
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });


});