import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getSingleUsers);
router.post('/users', UserController.createUser);
router.put('/users/:userId', UserController.UpdateUser);
router.delete('/users/:userId', UserController.deleteUser);

export const StudentRoutes = router;
