import authenticateToken from "../middleware/authmiddleware.js";
import { homeFeed, viewUserPost, editPost, addPost, deletePost } from "../controllers/homeController.js";
import express from "express";

const router= express.Router();

router.get('/view', authenticateToken, viewUserPost);
router.get('/feed', authenticateToken, homeFeed);
router.post('/add', authenticateToken, addPost);
router.patch('/edit/:postId', authenticateToken, editPost);
router.delete('/delete/:postId', authenticateToken, deletePost)

export default router;