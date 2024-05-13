import express from "express";
import MainController from "../Controller/MainController.js";
import AuthController from "../Controller/AuthController.js";
import MessageController from "../Controller/MessageController.js";
import ChatController from "../Controller/ChatController.js";
import UserController from "../Controller/UserController.js";

const router = express.Router();

router.get("/", MainController.serveIndex);

router.post("/login", AuthController.login);

router.post("/send", MessageController.saveMessage);
router.get("/messages/:chatId", MessageController.getChatMessages);

router.get("/chats/:userId", ChatController.getUserChats);

router.get("/user", UserController.getUsersByTelephone);

export default router;
