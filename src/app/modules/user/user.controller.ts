/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersformDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
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

const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const specificUserId = req.params.userId;
    const result = await userServices.getSingleUsersformDB(specificUserId);

    const singleUser = {
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
      message: 'User fetched successfully!',
      data: singleUser,
    });
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

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const result = await userServices.createUserIntoDB(user);

    const userData = {
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
      data: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Sumthing went wrong',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const specificUserId = req.params.userId;
    const result = await userServices.deleteUserformDB(specificUserId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
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

const UpdateUser = async (req: Request, res: Response) => {
  try {
    const updateUserId = req.params.userId;
    const updateUserData = req.body;
    const result = await userServices.UpdateUserformDB(
      updateUserId,
      updateUserData,
    );

    const updatedData = {
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
      message: 'User update successfully!',
      data: updatedData,
    });
  } catch (error) {
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
  getAllUsers,
  getSingleUsers,
  createUser,
  deleteUser,
  UpdateUser,
};
