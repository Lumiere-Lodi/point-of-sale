import { Sequelize, Dialect, DataTypes, ModelStatic } from 'sequelize';
import user, { UserInstance } from './user';
import products, { ProductInstance } from './product';
import upsells, { UpsellInstance } from './upsell';
import transaction, { TransactionInstance } from './transaction';
import transaction_product, { TransactionProductInstance } from './transaction-product';
import transaction_product_upsell, { TransactionProductUpsellInstance } from './transaction-product-upsell';
import { logger } from '@server/config/logger';

interface tables {
  user: ModelStatic<UserInstance>;
  product: ModelStatic<ProductInstance>;
  upsell: ModelStatic<UpsellInstance>;
  transaction: ModelStatic<TransactionInstance>;
  transaction_product: ModelStatic<TransactionProductInstance>;
  transaction_product_upsell: ModelStatic<TransactionProductUpsellInstance>;
}

// hold Db connection
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: process.env.DB_DIALECT as Dialect | undefined,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as number | undefined,
  },
);

const testDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

testDB();

// Create tables
const db: tables = {
  user: user(sequelize, DataTypes),
  product: products(sequelize, DataTypes),
  upsell: upsells(sequelize, DataTypes),
  transaction: transaction(sequelize, DataTypes),
  transaction_product: transaction_product(sequelize, DataTypes),
  transaction_product_upsell: transaction_product_upsell(sequelize, DataTypes),
};

//Create Association
db.upsell.belongsTo(db.product);
db.product.hasMany(db.upsell);

db.transaction.hasMany(db.transaction_product);
db.transaction_product.belongsTo(db.transaction);

db.transaction_product.hasMany(db.transaction_product_upsell);
db.transaction_product_upsell.belongsTo(db.transaction_product);

// As shown above, sync({ force: true }) and sync({ alter: true }) can be destructive operations.
// Therefore, they are not recommended for production-level software.
// Instead, synchronization should be done with the advanced concept of Migrations, with the help of the Sequelize CLI.

// Set to false to ensure data is not affected when we restart the server. Only recreate when the table does not exist

sequelize.sync({ force: false });
export default db;
