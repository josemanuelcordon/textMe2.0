import express from "express";
import MainController from "../Controller/MainController.js";
import AuthController from "../Controller/AuthController.js";

const router = express.Router();

router.get("/", MainController.serveIndex);

router.post("/login", AuthController.login);

export default router;
