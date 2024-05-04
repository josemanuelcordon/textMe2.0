import express from "express";
import MainController from "../Controller/MainController.js";

const router = express.Router();

router.get("/", MainController.serveIndex);

export default router;
