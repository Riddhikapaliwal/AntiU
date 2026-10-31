import { viewExperienceFunctionality, addExperienceFunctionality, editExperienceFuncionality, deleteExperienceFunctionality } from "../controllers/experienceController.js";
import authenticateToken from "../middleware/authmiddleware.js";

import express from "express";
const router= express.Router();

router.get('/view', authenticateToken, viewExperienceFunctionality);
router.post('/add', authenticateToken, addExperienceFunctionality);
router.patch('/edit/:experience_id', authenticateToken, editExperienceFuncionality);
router.delete('/delete/:experience_id', authenticateToken, deleteExperienceFunctionality);

export default router;