import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messages.controller.js";

const router = Router()

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

export default router;