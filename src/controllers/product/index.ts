import { RequestHandler, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../models';
import httpStatus from 'http-status';
import { productDataSchema } from '@server/utils/types/productSchema';
import { z } from 'zod';
import { catchAsync } from '@server/utils/catchAsync';

export const getProductData = (body:any) => {
  const { name, price, description, quantity } = body;

  const newProduct = {
    product_id: uuidv4(),
    name: name,
    price: price,
    description: description,
    quantity: quantity,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newProduct;
};
export const addProduct: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await db.product.create(getProductData(req.body));
  res.status(httpStatus.OK).send(result);
});

export const retrieveAll: RequestHandler = catchAsync(async (_req: Request, res: Response) => {
  const result = await db.product.findAll();
  res.status(httpStatus.OK).send(result);
});

export const deleteById: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await db.product.destroy({
    where: {
      product_id: req.params.id,
    },
  });

  res.sendStatus(httpStatus.OK).send(result);
});

export const updatebyId: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  // @todo: Add user_id to identify who added the product.

  const { name, price, description, quantity } = req.body;
  await db.product.update(
    {
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      updatedAt: new Date().toISOString(),
    },
    {
      where: {
        product_id: req.params.id,
      },
    },
  );

  const updatedProduct = await db.product.findOne({ where: { product_id: req.params.id } });

  res.status(httpStatus.OK).send(updatedProduct);
});

export const validateInputProductData: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = productDataSchema as z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
    const result = validationSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: 'Invalide Product Data' });
    }

    next();
  },
);
