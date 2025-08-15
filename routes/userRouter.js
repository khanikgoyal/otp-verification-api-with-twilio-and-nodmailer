import express from 'express';
import {register, verifyOTP, login, logout, getUser, forgotPassword, resetPassword} from '../controllers/userController.js'; 
import { isAuthenticated } from '../middelwares/auth.js';

const router = express.Router(); 

router.post('/register', register);
router.post('/otp-verification', verifyOTP);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getUser); 
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword); // Assuming resetPassword is defined in userController.js

 
export default router;