import { User } from "../models/user";
declare class userRepository {
    private static userList;
    static addUser: (user: User) => boolean;
    static removeUser: (id: number) => boolean;
    static getUser: (id: number) => User | undefined;
    static getUserByEmail: (email: string) => User | undefined;
}
export default userRepository;
