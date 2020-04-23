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
module.exports.io = socketIO(server); // Exportando desde server hasta sockets/sockets.js

// utilizando sockets
require('./sockets/socket');


// Escuchando servidor
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});