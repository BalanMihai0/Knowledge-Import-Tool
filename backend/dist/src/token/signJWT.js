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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = __importDefault(require("../../config.json"));
const User_1 = __importDefault(require("../repository/db/User"));
const signJWT = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInstance = yield User_1.default.findByPk(userId);
        if (!userInstance) {
            throw new Error('User not found');
        }
        const token = jsonwebtoken_1.default.sign({ id: userInstance.dataValues.id }, config_json_1.default.jwtSecret, { expiresIn: "1h" });
        return token;
    }
    catch (error) {
        console.error('Error signing JWT:', error.message);
        throw error;
    }
});
exports.default = signJWT;
