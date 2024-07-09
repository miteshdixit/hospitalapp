import express from "express";
import {getAllmessage, sendMessage} from "../controller/messageController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/send' , sendMessage);
router.get("/getmessage",isAuthenticated,getAllmessage)

export default router;