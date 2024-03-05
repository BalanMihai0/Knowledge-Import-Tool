import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import connection from './db';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: connection.config.host,
  username: connection.config.user,
  password: connection.config.password,
  database: connection.config.database,
});

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export type UserModel = Model<UserAttributes, UserCreationAttributes>;

const User = sequelize.define<UserModel>('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('User table created (if not exists)');
  })
  .catch((error: any) => {
    console.error('Error syncing User table:', error.message);
  });


export default User;