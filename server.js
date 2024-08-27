const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración para usar EJS y servir archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/share', (req, res) => {
    res.render('share');
});

app.get('/view', (req, res) => {
    res.render('view');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('share-location', (location) => {
        socket.broadcast.emit('receive-location', location);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Usa el puerto especificado en .env o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
