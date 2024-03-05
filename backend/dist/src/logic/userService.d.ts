import { UserModel } from "../repository/db/User";
declare class UserService {
    static addUser: (username: string, password: string) => Promise<boolean>;
    static removeUser: (id: number) => Promise<boolean>;
    static getUser: (id: number) => Promise<UserModel | null>;
    static authenticateUser: (username: string, password: string) => Promise<UserModel | undefined>;
}
export default UserService;
