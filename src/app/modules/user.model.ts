import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TUser, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User Id is Required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Name is Required'],
    maxlength: [20, 'User Name can not be more than 20 chraters'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    maxlength: [20, 'Password can not be more than 20 charactors'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First Name is Required'],
      maxlength: [20, 'First Name can not be more than 20 chraters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required'],
      maxlength: [20, 'Last Name can not be more than 20 chraters'],
      trim: true,
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid',
      },
    },
  },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
    },
    message: '{VALUE} is not a vlid email type',
  },
  isActive: { type: Boolean, default: true },
  hobbies: {
    type: [String],
    enum: {
      values: ['coding', 'reading', 'traveling'],
      message: '{VALUE} is not valid',
    },
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
});

// pre save middleware/hook
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/hook
userSchema.post('save', async function (doc, next) {
  doc.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// create a custom statics method
userSchema.statics.isUserExist = async function (id: number) {
  const existingUser = User.findOne({ userId: id });
  return existingUser;
};

// Create a Model.
export const User = model<TUser, UserModel>('User', userSchema);
