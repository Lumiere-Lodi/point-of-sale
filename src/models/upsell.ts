import { Sequelize, DataTypes, Model } from 'sequelize';

interface UpsellAttributes {
  upsell_id?: string;
  upsell_product_id: string;
  product_id: string;
  createdAt?: string;
  updatedAt?: string;
  productProductId?: string;
}

export interface UpsellInstance extends Model<UpsellAttributes>, UpsellAttributes {}

const upsells = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  return sequelize.define<UpsellInstance>('upsells', {
    upsell_id: {
      type: DataType.STRING,
    },
    upsell_product_id: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id',
      },
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
};

export default upsells;
