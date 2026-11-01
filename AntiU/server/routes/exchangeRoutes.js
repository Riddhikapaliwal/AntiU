import { viewReceivedRequest, sendReqFunctionality, RejectRequest, acceptRequest, viewSentRequest, rejectRequest } from "../controllers/exchangeController";
import authenticateToken from "../middleware/authmiddleware";

import express from "express";
const router= express.Router();

router.get('/viewReceivedReq', authenticateToken, viewReceivedRequest);
router.get('/viewSendReq', authenticateToken, viewSentRequest);
router.post('/sendReq', sendReqFunctionality);
router.post('/accept',acceptRequest);
router.post('/reject', rejectRequest)

export default router;