"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class userService {
}
userService.addUser = (user) => {
    const saltRounds = 10;
    bcrypt_1.default.hash(user.password, saltRounds, (err, hash) => {
        if (err) {
            return false;
        }
        else {
            return userRepository_1.default.addUser(user);
        }
    });
    return false;
};
userService.removeUser = (id) => {
    return userRepository_1.default.removeUser(id);
};
userService.getUser = (id) => {
    return userRepository_1.default.getUser(id);
};
userService.authenticateUser = (email, password) => {
    const user = userRepository_1.default.getUserByEmail(email);
    if (user)
        bcrypt_1.default.compare(password, user.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
            }
            else {
                if (result) {
                    console.log("Password is correct. User is authenticated.");
                    return user;
                }
                else {
                    console.log("Password is incorrect. Authentication failed.");
                }
            }
        });
    return undefined;
};
exports.default = userService;
