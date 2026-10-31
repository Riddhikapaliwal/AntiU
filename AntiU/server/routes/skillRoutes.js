import { viewSkillFunctionality, deleteSkillFunctionality, addSkillFunctionality } from "../controllers/skillController.js";
import authenticateToken from "../middleware/authmiddleware.js";

import express from "express";
const router= express.Router();

router.get('/view', authenticateToken, viewSkillFunctionality);
router.post('/add', authenticateToken, addSkillFunctionality);
router.delete('/delete', authenticateToken, deleteSkillFunctionality);

export default router;