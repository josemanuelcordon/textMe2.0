import express from "express";
import MainController from "../Controller/MainController.js";
import AuthController from "../Controller/AuthController.js";
import MessageController from "../Controller/MessageController.js";
import ChatController from "../Controller/ChatController.js";
import UserController from "../Controller/UserController.js";
import ImageController from "../Controller/ImageController.js";
import upload from "./uploadMiddleWare.js";

const router = express.Router();

// Definir tus rutas existentes
router.get("/", MainController.serveIndex);
router.post("/login", AuthController.login);
router.post("/send", MessageController.saveMessage);
router.get("/messages/:chatId/:userId", MessageController.getChatMessages);
router.delete("/message/:messageId", MessageController.deleteMessage);
router.put("/message/:messageId", MessageController.updateMessage);
router.get("/read/:chatId/:userId", MessageController.readMessages);
router.get("/chats/:userId", ChatController.getUserChats);
router.post("/chat/create", ChatController.createChat);
router.post("/group-chat/create", ChatController.createGroupChat);
router.get("/users", UserController.getAllUsers);
router.get("/user", UserController.getUsersByUsername);
router.get("/user/:userId/friends", UserController.getUserFriends);
router.post("/user/create", UserController.createUser);
router.put("/user/:userId/enable", UserController.enableAccount);
router.put("/user/:userId/unable", UserController.unableAccount);
router.put("/user/:userId/ban", UserController.banUser);
router.put("/user/:userId/disban", UserController.disbanUser);
router.get("/profile-image/:userId", ImageController.getProfileImage);
router.get("/chat-image/:chatId/:userId", ImageController.getChatImage);
router.post(
  "/upload/profile-image",
  upload.any(),
  ImageController.uploadProfileImage
);
router.post(
  "/upload/chat-image",
  upload.any(),
  ImageController.uploadChatImage
);

// Ruta de comodín para redirigir a la página principal ("/") para rutas no manejadas
router.all("*", (req, res) => {
  res.redirect("/");
});

export default router;
