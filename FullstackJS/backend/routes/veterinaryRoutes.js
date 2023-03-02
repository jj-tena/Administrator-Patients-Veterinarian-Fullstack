import express from "express";
import { 
    register, 
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword
} from "../controllers/veterinaryController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public 

router.post('/', register);

router.get('/confirm/:token', confirm);

router.post('/login', authenticate);

router.post('/forgot-password', forgotPassword);

router.route('/forgot-password/:token').get(checkToken).post(newPassword);

// Private

router.get('/profile', checkAuth, profile);

export default router;