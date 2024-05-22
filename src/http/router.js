import express from "express";
import MainController from "../Controller/MainController.js";
import AuthController from "../Controller/AuthController.js";
import MessageController from "../Controller/MessageController.js";
import ChatController from "../Controller/ChatController.js";
import UserController from "../Controller/UserController.js";
import ImageController from "../Controller/ImageController.js";
import upload from "./uploadMiddleWare.js";

const router = express.Router();

router.get("/", MainController.serveIndex);

router.post("/login", AuthController.login);

router.post("/send", MessageController.saveMessage);
router.get("/messages/:chatId/:userId", MessageController.getChatMessages);
router.get("/read/:chatId/:userId", MessageController.readMessages);

router.get("/chats/:userId", ChatController.getUserChats);
router.post("/chat/create", ChatController.createChat);
router.post("/group-chat/create", ChatController.createGroupChat);

router.get("/user", UserController.getUsersByTelephone);
router.get("/user/:userId/friends", UserController.getUserFriends);

router.post("/upload", upload.any(), ImageController.uploadImage);
router.get("/uploads/:userId", ImageController.getProfileImage);
router.get("/chat-image/:chatId/:userId", ImageController.getChatImage);

export default router;
