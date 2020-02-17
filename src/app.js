const path = require('path');
const http = require('http');
const express  = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
 

io.on('connection', () => {
    console.log('olaaa');
})

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`app listening to ${port} port`);
});