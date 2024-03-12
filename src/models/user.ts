import { Sequelize, DataTypes, Model } from 'sequelize';

interface UserAttributes {
  user_id: string;
  name?: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const user = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  const createUserTable = sequelize.define<UserInstance>(
    'users',
    {
      user_id: {
        type: DataType.STRING,
        allowNull: false,
      },
      name: {
        type: DataType.STRING,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataType.DATE,
      },
      updatedAt: {
        type: DataType.DATE,
      },
    },
    {
      tableName: 'users',
    },
  );

  return createUserTable;
};

export default user;
