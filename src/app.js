const path = require('path');
const http = require('http');
const express  = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
 
io.on('connection', (socket) => {
    console.log('Client Connected with socket id: ',socket.id);

    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'user has left');
    });

    socket.on('sendLocation', (coords) => {
        socket.broadcast.emit('message', {
            user: socket.id,
            address: `https://google.com/maps?q=${coords.lat},${coords.long}`
        });
    })

    
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`app listening to ${port} port`);
});