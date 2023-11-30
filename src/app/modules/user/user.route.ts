import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router
  .route('/')
  .post(UserController.createUser)
  .get(UserController.getAllUsers);

router
  .route('/:userId')
  .get(UserController.getSingleUsers)
  .put(UserController.UpdateUser)
  .delete(UserController.deleteUser);

router
  .route('/:userId/orders')
  .post(UserController.createUserOrder)
  .get(UserController.getAllOrders);

router
  .route('/:userId/orders/total-price')
  .get(UserController.getOrderTotalPrice);

export const userRoutes = router;
