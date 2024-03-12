import { Sequelize, DataTypes, Model } from 'sequelize';

interface TransactionProductAttributes {
  id: string;
  transactions_products_id: string;
  transaction_id: string;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
  transactionTransactionsId?: string;
}

export interface TransactionProductInstance extends Model<TransactionProductAttributes>, TransactionProductAttributes {}

const transaction_product = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  return sequelize.define<TransactionProductInstance>('transactions_products', {
    id: {
      type: DataType.STRING,
      primaryKey: true,
      unique: true,
    },
    transactions_products_id: {
      type: DataType.STRING,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
    transaction_id: {
      type: DataType.STRING,
      primaryKey: true,
      references: {
        model: 'transactions',
        key: 'transactions_id',
      },
      onDelete: 'CASCADE',
    },
    quantity: DataType.INTEGER,
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
};

export default transaction_product;
