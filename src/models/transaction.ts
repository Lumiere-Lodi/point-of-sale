import { Sequelize, DataTypes, Model } from 'sequelize';

interface TransactionAttributes {
  transactions_id: string;
  total?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionInstance extends Model<TransactionAttributes>, TransactionAttributes {}

const transaction = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  return sequelize.define<TransactionInstance>('transactions', {
    transactions_id: {
      type: DataType.STRING,
      primaryKey: true,
    },
    total: DataType.INTEGER,
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
};

export default transaction;
