import express from "express";
import { 
    register, 
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword,
    updateProfile,
    updatePassword
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

router.put('/profile/:id', checkAuth, updateProfile);

router.put('/update-password', checkAuth, updatePassword);



export default router;