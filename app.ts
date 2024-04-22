import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

interface Message {
  room_id: number,
  voltage: number,
  current: number,
  power: number,
  energy: number,
  frequency: number
}

io.on('connection', (socket: Socket) => {
  socket.on('sendData', (data: Message) => {
    console.log(data);
    io.emit('newMessage', data);
  });
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});
