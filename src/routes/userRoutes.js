import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', userController.protect, userController.getProfile);
router.get('/login', userController.redirectIfLoggedIn, userController.getLogin);
router.get('/register', userController.redirectIfLoggedIn, userController.getRegister);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

export default router;