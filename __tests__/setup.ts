process.env = {
  ...process.env,
  HOST: 'localhost',
  PORT: '5000',
  DB_PORT: '5432',
  DB_NAME: 'munchpos',
  DB_USERNAME: 'munchpos',
  DB_PASSWORD: 'munchpos',
  DB_DIALECT: 'postgres',
  JWT_SECRET: 'RS256',
  HASH_SALT: '5',
  TESTING_STUFF: 'lumiere',
  TESTING:'true'
};
