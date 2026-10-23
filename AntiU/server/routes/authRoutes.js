import express from "express";
const router= express.Router();
import {signupFunctionality, loginFunctionality} from "../controllers/authController.js";

router.post('/signup', signupFunctionality);
router.post('/login', loginFunctionality)

export default router;