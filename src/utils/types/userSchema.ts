import { z } from 'zod';

const userData = {
  name: z.string(),
  email: z.string().min(1),
  password: z.string().min(1),
};

export const userDataSchema = z.object(userData);
export type UserDataSchema = z.infer<typeof userDataSchema>;
