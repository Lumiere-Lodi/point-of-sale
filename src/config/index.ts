import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV || 'local'}`) });

export default {
  env: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? '5000',
  host: process.env.HOST ?? 'localhost',
  pg: {
    dialect: process.env.DB_DIALECT ?? 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? '5432',
    database: process.env.DB_NAME ?? 'munchpos',
    username: process.env.DB_USERNAME ?? 'munchpos',
    password: process.env.DB_PASSWORD ?? 'munchpos',
  },
};
