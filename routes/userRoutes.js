import express from 'express';
import { register, login, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getUser);
router.put('/me', protect, updateUser);
router.delete('/me', protect, deleteUser);

export default router;
