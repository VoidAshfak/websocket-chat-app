import { createServer } from 'node:http';
import express from 'express';
import { Server } from "socket.io"

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const ROOM = 'group';

io.on('connection', (socket) => {
    console.log(`A user connected:: ${socket.id}`);

    socket.on('joinRoom', async (userName) => {
      console.log(`${userName} has joined the room`);
      await socket.join(ROOM);
      socket.to(ROOM).emit('roomNotice', userName);
    })

    socket.on('chatMessage', (msg) => {
        console.log('msg:', msg);
        socket.to(ROOM).emit('chatMessage', msg);
    });

    socket.on('typing', (userName) => {
        socket.to(ROOM).emit('typing', userName);
    })

    socket.on('stopTyping', (userName) => {
      socket.to(ROOM).emit('stopTyping', userName);
    })


})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server is running...');
});