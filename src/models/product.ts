import { Sequelize, DataTypes, Model } from 'sequelize';

interface ProductAttributes {
  product_id: string;
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInstance extends Model<ProductAttributes>, ProductAttributes {}

const products = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  return sequelize.define<ProductInstance>('products', {
    product_id: {
      type: DataType.STRING,
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    name: DataType.STRING,
    price: DataType.INTEGER,
    description: DataType.STRING,
    quantity: DataType.INTEGER,
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
};

export default products;
