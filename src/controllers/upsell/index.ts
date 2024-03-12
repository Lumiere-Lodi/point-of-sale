import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../../models';
import httpStatus from 'http-status';
import { catchAsync } from '@server/utils/catchAsync';
// import setupDatabase from '../../models';
// const { db, sequelize } = setupDatabase();

export const getUpsellData = (body: any) => {
  const { upsell, product } = body;

  const newUpsell = {
    upsell_id: uuidv4(),
    upsell_product_id: upsell,
    product_id: product,
    productProductId: upsell,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newUpsell;
};
export const createUpsell: RequestHandler = catchAsync(async (req, res) => {
  const result = await db.upsell.create(getUpsellData(req.body));
  res.status(200).send(result);
});

export const retrieveUpsell: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const upsellProducts = await db.upsell.findAll({
    where: { product_id: id },
    include: [{ model: db.product }],
  });

  res.status(200).send(upsellProducts);
});

export const deleteUpsell: RequestHandler = catchAsync(async (req, res) => {
  const { product_id, upsell_id } = req.params;
  const result = await db.upsell.destroy({
    where: {
      product_id: product_id,
      upsell_product_id: upsell_id,
    },
  });
  res.sendStatus(httpStatus.OK).send(result);
});
