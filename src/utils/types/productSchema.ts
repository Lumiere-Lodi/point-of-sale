import { z } from 'zod';

const productData = {
  name: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
  description: z.string().optional(),
};

export const productDataSchema = z.object(productData);
export type ProductDataSchema = z.infer<typeof productDataSchema>;
