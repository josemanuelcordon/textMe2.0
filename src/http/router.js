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

router.get("/user", UserController.getUsersByUsername);
router.get("/user/:userId/friends", UserController.getUserFriends);
router.post("/user/create", UserController.createUser);

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

export default router;
