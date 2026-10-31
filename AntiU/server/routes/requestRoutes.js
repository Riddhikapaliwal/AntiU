import authenticateToken from "../middleware/authmiddleware.js";
import searchFunctionality from "../controllers/requestCotroller.js"
import {express} from "express"

const router= express.Router();

router.get('/search', authenticateToken, searchFunctionality);

export default router;