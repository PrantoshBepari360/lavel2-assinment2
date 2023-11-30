/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import { TOrder } from './user.interface';
import userValidationSchema from './user.validation';

// create a user after validation Zod
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodParseData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDB(zodParseData);

    const createUserData = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: createUserData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Sumthing went wrong',
      error,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsersData = await userServices.getAllUsersformDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: allUsersData,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get single user
const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = await userServices.getSingleUsersformDB(userId);

    const singleUser = {
      userId: userData.userId,
      username: userData.username,
      fullName: userData.fullName,
      age: userData.age,
      email: userData.email,
      isActive: userData.isActive,
      hobbies: userData.hobbies,
      address: userData.address,
    };

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: singleUser,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Somthing went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const deleteAUser = await userServices.deleteUserformDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: deleteAUser?.deletedCount === 1 && null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Sumthing went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update a user
const UpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updateUserData = req.body;
    const updatedData = await userServices.UpdateUserformDB(
      userId,
      updateUserData,
    );

    const updatedUserData = {
      userId: updatedData.userId,
      username: updatedData.username,
      fullName: updatedData.fullName,
      age: updatedData.age,
      email: updatedData.email,
      isActive: updatedData.isActive,
      hobbies: updatedData.hobbies,
      address: updatedData.address,
    };

    res.status(200).json({
      success: true,
      message: 'User update successfully!',
      data: updatedUserData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// create user order
const createUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userOrderData = req.body;
    const user = await userServices.getSingleUsersformDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const userOrder = await userServices.addUserOrderformDB(
      userId,
      userOrderData,
    );

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: userOrder.orders && null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Somthing went wrong',
      data: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await userServices.getSingleUsersformDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: user.orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

// get a user orders total price
const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const UserId = req.params.userId;
    const user = await userServices.getSingleUsersformDB(UserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    if (user.orders !== undefined && user.orders.length > 0) {
      let totalPrice = 0;

      user.orders.map((order: TOrder) => {
        totalPrice += order.price * order.quantity;
      });

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: totalPrice,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
  UpdateUser,
  createUserOrder,
  getAllOrders,
  getOrderTotalPrice,
};
