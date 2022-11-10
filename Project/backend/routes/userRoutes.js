import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/users.controller.js';
import { protect, role } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, role, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, role, deleteUser)
  .get(protect, role, getUserById)
  .put(protect, role, updateUser);

export default router;
