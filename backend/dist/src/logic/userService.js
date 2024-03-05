"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../repository/db/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
}
_a = UserService;
UserService.addUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield hashPass(password);
        if (!hashedPassword) {
            throw new Error('Error hashing password');
        }
        const user = yield User_1.default.create({
            username,
            password: hashedPassword,
        });
        console.log('User registered:', user.toJSON());
        return true;
    }
    catch (error) {
        console.error('Error registering user:', error.message);
        return false;
    }
});
UserService.removeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            console.error('User not found');
            return false;
        }
        yield user.destroy();
        console.log('User removed:', user.toJSON());
        return true;
    }
    catch (error) {
        console.error('Error removing user:', error.message);
        return false;
    }
});
UserService.getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(id);
        return user || null;
    }
    catch (error) {
        console.error('Error getting user:', error.message);
        return null;
    }
});
UserService.authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield User_1.default.findOne({
            where: {
                username: username,
            },
        }));
        if (user) {
            const result = yield comparePasswords(password, user.dataValues.password);
            if (result) {
                console.log("Password is correct. User is authenticated.");
                return user;
            }
            else {
                console.log("Password is incorrect. Authentication failed.");
            }
        }
        console.log("User not found. Authentication failed.");
        return undefined;
    }
    catch (error) {
        console.error('Error authenticating user:', error.message);
        return undefined;
    }
});
const hashPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    try {
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (err) {
        console.error("Error hashing password:", err);
        return undefined;
    }
});
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(password, hashedPassword);
    }
    catch (err) {
        console.error("Error comparing passwords:", err);
        return false;
    }
});
exports.default = UserService;
