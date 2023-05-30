import dotenv from "dotenv-defaults";
dotenv.config();
import path from 'path'
import { createServer } from 'http'
// import { createServer } from 'https'
import { Server } from "socket.io";

console.log("dotenv = ", process.env.PORT)
const PORT = process.env.PORT || 8000

const httpc = createServer().listen(PORT, () => {
  console.log(`WebSocket server started on PORT ${PORT}`);
});
// Create a Socket.IO instance and attach it to the server
const io = new Server (httpc, {
    cors: {
      allowedHeaders: ["my-header"]
    }
  });

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('disconnect', () =>
    console.log(`Disconnected: ${socket.id}`)
  );

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    // io.emit('chat', message);
    io.to(room).emit('chat', message);
  });

  socket.on('addlikecnt', (data) => {
    const { room } = data;
    console.log(`add like room: ${room}`);
    io.to(room).emit('addlikecnt');
  });

  socket.on('minuslikecnt', (data) => {
    const { room } = data;
    console.log(`minus like room: ${room}`);
    io.to(room).emit('minuslikecnt');
  });
});