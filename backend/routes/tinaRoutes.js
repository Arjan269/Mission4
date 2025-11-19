import express from "express";
import { chatWithTina } from "../controllers/tinaController.js";

const router = express.Router();

router.post("/chat", chatWithTina);

export default router;
