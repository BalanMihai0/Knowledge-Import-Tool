import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id: number;
    username: string;
    password: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}
export type UserModel = Model<UserAttributes, UserCreationAttributes>;
declare const User: import("sequelize").ModelCtor<UserModel>;
export default User;
