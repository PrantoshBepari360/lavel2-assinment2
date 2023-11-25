import mongoose from 'mongoose';
import { User } from '../user.model';
import { TUser } from './user.interface';

const getAllUsersformDB = async () => {
  const getAllUsers = await User.find();

  const containData = getAllUsers.map((user) => ({
    username: user.username,
    fullName: user.fullName,
    age: user.age,
    email: user.email,
    address: user.address,
  }));

  return containData;
};

const getSingleUsersformDB = async (id: string) => {
  if (await User.isUserExist(Number(id))) {
    const getSingleUser = await User.aggregate([
      { $match: { userId: Number(id) } },
    ]);

    const containData = getSingleUser.reduce((acc, cur) => {
      return { ...acc, ...cur };
    });
    return containData;
  }
};

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exists!');
  }

  const result = await User.create(userData);
  return result;
};

const deleteUserformDB = async (id: string) => {
  if (await User.isUserExist(Number(id))) {
    await User.deleteOne({ userId: Number(id) });
    return null;
  }
};

const UpdateUserformDB = async (
  updateUserId: string,
  updatedData: { user: TUser },
) => {
  if (await User.isUserExist(Number(!updatedData))) {
    throw new Error();
  }
  try {
    await User.updateOne(
      { userId: Number(updateUserId) },
      { $set: updatedData.user },
    );

    return updatedData.user;
  } finally {
    mongoose.disconnect();
  }
};

export const userServices = {
  getAllUsersformDB,
  getSingleUsersformDB,
  createUserIntoDB,
  deleteUserformDB,
  UpdateUserformDB,
};
