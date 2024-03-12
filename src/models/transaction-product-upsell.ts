import { Sequelize, DataTypes, Model } from 'sequelize';

interface TransactionProductUpsellAttributes {
  transactions_product_upsell: string;
  transactions_products_id: string;
  transactions_id: string;
  createdAt?: string;
  updatedAt?: string;
  transactionsProductId?: string;
}

export interface TransactionProductUpsellInstance
  extends Model<TransactionProductUpsellAttributes>,
    TransactionProductUpsellAttributes {}

const transaction_product_upsell = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  return sequelize.define<TransactionProductUpsellInstance>('transactions_product_upsells', {
    transactions_product_upsell: {
      type: DataType.STRING,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
    transactions_products_id: {
      type: DataType.STRING,
      primaryKey: true,
      references: {
        model: 'transactions_products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    transactions_id: {
      type: DataType.STRING,
      primaryKey: true,
      references: {
        model: 'transactions',
        key: 'transactions_id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
};

export default transaction_product_upsell;
