import {
  editProfileFunctionality,
  viewProfileFunctionality,
  viewPublicProfile
} from "../controllers/profileController.js";
import authenticateToken from "../middleware/authmiddleware.js";

import express from "express";
const router = express.Router();

router.get("/view", authenticateToken, viewProfileFunctionality);
router.patch("/edit", authenticateToken, editProfileFunctionality);
router.get("/public/:userId",authenticateToken,  viewPublicProfile);

export default router;
