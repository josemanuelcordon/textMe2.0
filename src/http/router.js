import express from "express";
import MainController from "../Controller/MainController.js";
import AuthController from "../Controller/AuthController.js";
import MessageController from "../Controller/MessageController.js";

const router = express.Router();

router.get("/", MainController.serveIndex);

router.post("/login", AuthController.login);

router.post("/send", MessageController.saveMessage);

export default router;
