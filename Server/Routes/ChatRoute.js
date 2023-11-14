import express from 'express';
import { createChat, deleteChat, findChat, userChats } from '../Controllers/ChatController.js';

const router  = express.Router();

router.post("/", createChat);
router.delete("/",deleteChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);
export default router;