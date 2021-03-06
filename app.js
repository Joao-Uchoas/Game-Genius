const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var contador=0;


app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});


io.on('connection', (socket) => {
    console.log(`${socket.id} conectado`);
    contador +=1;
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconectado`);
      contador -=1;
    });
    console.log(contador); 
   
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});