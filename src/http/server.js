import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import router from "./router.js";

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(router);

io.on("connection", (socket) => {
  console.log("Connection completed");

  socket.on("sendMessage", (message) => {
    console.log("mensaje recibido:", JSON.stringify(message));
    io.emit("message", message);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
