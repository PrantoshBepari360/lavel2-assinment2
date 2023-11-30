import { z } from 'zod';

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().max(20),
  password: z.string().max(20),
  fullName: z.object({
    firstName: z.string().max(20),
    lastName: z.string().max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(
    z.object({
      productName: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ).optional(),
});

export default userValidationSchema;
