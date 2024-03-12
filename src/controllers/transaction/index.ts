import { RequestHandler } from 'express';
import db, { sequelize } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import httpStatus from 'http-status';
import { catchAsync } from '@server/utils/catchAsync';

interface ProductType {
  id: string;
  transactions_products_id: string;
  transaction_id: string;
  quantity: number;
  transactionTransactionsId: string;
  createdAt: string;
  updatedAt: string;
}

interface UpsellProductType {
  transactions_product_upsell: string;
  transactions_products_id: string;
  transactions_id: string;
  transactionsProductId: string;
  createdAt: string;
  updatedAt: string;
}
interface ProductInput {
  product_id: string;
  quantity: number;
  upsell_product: string[];
}

export const createTransaction: RequestHandler = catchAsync(async (req, res) => {
  const t = await sequelize.transaction();

  const { product, totalAmount } = req.body;
  db.transaction
    .create(
      {
        transactions_id: uuidv4(),
        total: totalAmount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { transaction: t },
    )
    .then(async (transaction) => {
      const transID = transaction.transactions_id;

      const products = product as ProductInput[];
      const transactionUpsellData: UpsellProductType[] = [];

      const transactionProduct: ProductType[] = products.map((p) => {
        const productData = {
          id: uuidv4(),
          transactions_products_id: p.product_id,
          transaction_id: transID,
          quantity: p.quantity,
          transactionTransactionsId: transID,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        p.upsell_product.map((upsell: string) => {
          const upsellProduct: UpsellProductType = {
            transactions_product_upsell: upsell,
            transactions_products_id: productData.id,
            transactions_id: transID,
            transactionsProductId: productData.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          transactionUpsellData.push(upsellProduct);
        });

        return productData;
      });

      await db.transaction_product
        .bulkCreate(transactionProduct, {
          transaction: t,
        })
        .then(async (productResult) => {
          const upsellResult = await db.transaction_product_upsell.bulkCreate(transactionUpsellData, {
            transaction: t,
          });

          await t.commit();
          console.log('Transaction and associated products added successfully');
          res.status(httpStatus.OK).send({
            ...transaction.dataValues,
            productResult,
            upsellResult,
          });
        });
    })
    .catch(async (error) => {
      console.error('Error adding transaction and associated products:', error);
      await t.rollback();
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    });
});

export const retrieveTransaction: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const transaction = await db.transaction_product_upsell.findAll({
    where: { transactions_id: id },
    include: { all: true, nested: true },
  });

  res.status(200).send(transaction);
});
