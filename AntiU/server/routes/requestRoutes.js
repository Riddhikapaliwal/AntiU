import authenticateToken from "../middleware/authmiddleware.js";
import {searchFunctionality, viewUserProfile} from "../controllers/requestCotroller.js";
import express from "express"

const router= express.Router();

router.get('/search', authenticateToken, searchFunctionality);
router.get('/userProfile/:user_id', authenticateToken, viewUserProfile);

export default router;