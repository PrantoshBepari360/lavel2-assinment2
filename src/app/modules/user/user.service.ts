import { User } from '../user.model';
import { TUser, TOrder } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// create a user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exists!');
  }

  return await User.create(userData);
};

// get all users
const getAllUsersformDB = async () => {
  const getAllUsers = await User.find();

  return getAllUsers.map((user) => ({
    username: user.username,
    fullName: user.fullName,
    age: user.age,
    email: user.email,
    address: user.address,
  }));
};

// get a single user
const getSingleUsersformDB = async (id: string) => {
  if (!(await User.isUserExist(Number(id)))) {
    throw new Error('User not found');
  }

  const getSingleUser = await User.aggregate([
    { $match: { userId: Number(id) } },
  ]);

  return getSingleUser.reduce((acc, cur) => {
    return { ...acc, ...cur };
  });
};

// delete a single user
const deleteUserformDB = async (id: string) => {
  if (!(await User.isUserExist(Number(id)))) {
    throw new Error('User not found');
  }

  return await User.deleteOne({ userId: Number(id) });
};

// update a single user
const UpdateUserformDB = async (id: string, updatedData: TUser) => {
  if (!(await User.isUserExist(Number(id)))) {
    throw new Error('User not found');
  }

  updatedData.password = await bcrypt.hash(
    updatedData.password,
    Number(config.bcrypt_salt_rounds),
  );

  await User.updateOne({ userId: Number(id) }, { $set: updatedData });

  return updatedData;
};

// create user order
const addUserOrderformDB = async (userId: string, userOrderData: TOrder) => {
  if (!(await User.isUserExist(Number(userId)))) {
    throw new Error('User not found');
  }

  return await User.findOneAndUpdate(
    { userId },
    { $push: { orders: userOrderData } },
    { upsert: true, new: true },
  );
};

// get all orders

export const userServices = {
  createUserIntoDB,
  getAllUsersformDB,
  getSingleUsersformDB,
  deleteUserformDB,
  UpdateUserformDB,
  addUserOrderformDB,
};
