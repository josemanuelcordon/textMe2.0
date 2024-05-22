import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import router from "./router.js";
import bodyParser from "body-parser";

import ChatService from "../Service/ChatService.js";
import UserService from "../Service/UserService.js";
import MessageService from "../Service/MessageService.js";

const userSockets = new Map();

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(router);

io.on("connection", async (socket) => {
  console.log("Connection completed");
  console.log(await UserService.getUserFriends(1));

  socket.on("subscribeToChats", async (userId) => {
    const userSocketsIds = userSockets.get(userId) ?? [];
    userSockets.set(userId, [...userSocketsIds, socket.id]);

    const userChats = await ChatService.getUserChats(userId);
    userChats.forEach((chat) => {
      socket.join(`chat-${chat.id}`);
      console.log(`Usuario unido a la sala ${chat.id}`);
    });
  });

  socket.on("readMessages", async ({ chat, user }) => {
    console.log("mensajes leidos");
    await MessageService.readMessages(chat, user);
  });

  socket.on("sendMessage", async (message) => {
    console.log("Mensaje recibido!");
    const receivers = await UserService.getUserIdsByChat(message.chat);
    receivers.forEach((receiver) => {
      const receiverSocketIds = userSockets.get(receiver.id_user) ?? [];
      receiverSocketIds.forEach((receiverSocketId) => {
        io.sockets.sockets.get(receiverSocketId).join(`chat-${message.chat}`);
      });
    });

    io.in(`chat-${message.chat}`).emit("message", message);
  });

  socket.on("disconnect", () => {
    const disconnectedSocketId = socket.id;
    userSockets.forEach((sockets, userId) => {
      const index = sockets.indexOf(disconnectedSocketId);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          userSockets.delete(userId);
        }
      }
    });
    console.log("Socket disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
