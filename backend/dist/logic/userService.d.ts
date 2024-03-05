import { User } from "../models/user";
declare class userService {
    static addUser: (user: User) => boolean;
    static removeUser: (id: number) => boolean;
    static getUser: (id: number) => User | undefined;
    static authenticateUser: (email: string, password: string) => User | undefined;
}
export default userService;
