import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
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
const sslDir = path.join("/", "etc", "ssl", "private");
const app = express();
// Cargar certificados SSL
const privateKey = fs.readFileSync(path.join(sslDir, "private.key"), "utf8");
const certificate = fs.readFileSync(
  path.join(sslDir, "certificate.crt"),
  "utf8"
);
const credentials = { key: privateKey, cert: certificate };

// Servidor HTTP para desarrollo
const httpServer = http.createServer(app);
// Servidor HTTPS para producción
const httpsServer = https.createServer(credentials, app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public", "client")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(router);

// Redirigir HTTP a HTTPS en producción
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.protocol === "http") {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

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
    await MessageService.readMessages(chat, user);
  });

  socket.on("updateMessage", async (message) => {
    io.in(`chat-${message.chat}`).emit("updateMessage", message);
  });

  socket.on("deleteMessage", async (message) => {
    io.in(`chat-${message.chat}`).emit("deleteMessage", message.id);
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

// Escucha en ambos puertos
const portHttp = 80;
const portHttps = 443;

httpServer.listen(portHttp, () => {
  console.log(`HTTP Server running on port ${portHttp}`);
});

httpsServer.listen(portHttps, () => {
  console.log(`HTTPS Server running on port ${portHttps}`);
});
