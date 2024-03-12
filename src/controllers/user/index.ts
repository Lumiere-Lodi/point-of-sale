import { RequestHandler, Response, Request, NextFunction } from 'express';
import db from '../../models';
import { v4 as uuidv4 } from 'uuid';
import hashPassword from 'bcryptjs';
import { userDataSchema } from '@server/utils/types/userSchema';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { catchAsync } from '@server/utils/catchAsync';
import httpStatus from 'http-status';
import ApiError from '@server/utils/ApiError';

export const getUserData = async (body: any) => {
  const { email, password, name } = body;
  const hashedPassword = await hashPassword.hash(password, Number(process.env.HASH_SALT));
  const newUser = {
    user_id: uuidv4(),
    name: name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    email: email,
    password: hashedPassword,
  };

  return newUser;
};
export const addUser: RequestHandler = catchAsync(async (req, res) => {
  const newUser = await db.user.create(await getUserData(req.body));
  const newUserWithoutPassword = { ...newUser.toJSON(), password: undefined };
  res.status(httpStatus.OK).send(newUserWithoutPassword);
});

export const verifyUniqueEmail: RequestHandler = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const { email } = req.body;

  const existingUser = await db.user.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
  }
  next();
});

export const validateInputData: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validationSchema = userDataSchema as z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
  const result = validationSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: 'Invalide User Data' });
  }
  next();
});

export const login: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const privateKey = fs.readFileSync('src/constants/private.pem', 'utf8');
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await hashPassword.compare(password, user!.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ user_id: user!.user_id }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '30m',
    });
    res.status(200).json({ token });
});
