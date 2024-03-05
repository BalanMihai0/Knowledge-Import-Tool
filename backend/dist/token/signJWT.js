"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_json_1 = __importDefault(require("../../config.json"));
const signJWT = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id }, config_json_1.default.jwtSecret, { expiresIn: "1h" });
};
exports.default = signJWT;
