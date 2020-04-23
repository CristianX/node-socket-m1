 // IO Aparece gracias a la implementación del socket
 // var es para aumentar la compatibilidad entre diferentes navegadores web
 var socket = io();

 socket.on('connect', function() {
     console.log('Conectado al servidor');
 });

 // on es para escuchar información
 socket.on('disconnect', function() {
     console.log('Se perdió la conexión con el servidor');
 });

 // Enviar información, se puede enviar booleans, string, etc pero no es recomendable, lo mejor es mandar un objeto
 socket.emit('enviarMensaje', {
     usuario: 'Cristian',
     mensaje: 'Hola mundo'
 }, function(resp) {
     // console.log('Se disparó el callback');
     console.log('Respuesta server: ', resp);
 });


 // Escuchando información del server
 socket.on('enviarMensaje', function(mensaje) {
     console.log('Servidor', mensaje);
 });