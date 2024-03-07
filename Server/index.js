import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

const app = express();
const port = 5174;
app.use(
  cors({
    origin: "http://192.168.1.10:5173/", // kalo mau bikin live ini ganti
    methods: ["GET", "POST"], 
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.10:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

server.listen(port, () => {
  console.log(`SERVER RUNNING`);
});
